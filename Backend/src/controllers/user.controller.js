import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";  // Import the Cloudinary utility
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary.js";


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
        throw new ApiError(500, "Failed to generate tokens");
    }
};

const sendVerificationMail = async (email) => {
    
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const mail = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Email Verification',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                 <h1 style="text-align: center; color: #2c3e50;">EduMaxi</h1>
                <h2 style="text-align: center; color: #333;">Verify Your Email</h2>
                <p>Hello,</p>
                <p>Please use the following One-Time Password (OTP) to verify your email address:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="display: inline-block; padding: 12px 24px; font-size: 24px; letter-spacing: 12px; background-color: #fff; border: 1px dashed #ccc; border-radius: 8px;">
                    ${otp}
                    </span>
                </div>
                <p>This code is valid for the next 10 minutes. Do not share it with anyone.</p>
                <p style="color: #888; font-size: 12px;">If you didn’t request this, please ignore this email.</p>
                <p>Best regards,<br/>Your Company Name</p>
                </div>
            `,
        });
        console.log("verification mail", otp)
        return otp;
    } catch (error) {
        return 0
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from the frontend, including optional fields
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Check if the required fields are present
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    // Create the new user with optional fields, if provided
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
    });

    // Fetch the created user without sensitive fields like password or refreshToken
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // If user creation fails, throw an error
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Return the created user in the response
    // const tokens = await generateAccessAndRefreshTokens(user._id);
    // const { accessToken, refreshToken } = tokens;


    // const options={
    //     httpOnly: true,
    //     secure: true
    // }

    return res
    .status(200)
    // .cookie("accessToken", accessToken, options)
    // .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
              {user:createdUser},
             "User logged in successfully")
    );
    
});


const loginUser = asyncHandler(async (req, res) => {
    //req body -> data
    // username or email
    //find the user
    // password check
    //access and refresh token
    //send cookie

    const { email, password } = req.body;
    console.log("login",req.body);
    
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if(!user)
    {
        throw new ApiError(404, "Invalid email");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid)
    {
        throw new ApiError(401, "Incorrect password");
    }
    // generate a otp of 4 digits
    console.log("Hello")
    const otp = await sendVerificationMail(email)

    if(otp === 0){
        throw new ApiError(500, "Failed to send OTP verification mail");
    }
    user.otp = otp;
    console.log("OTP",otp);
    
    await user.save();

    res
    .status(200)
    .json(
        new ApiResponse(200,{user}, "OTP sent successfully")
    )
    
});


const forgetPassword = async (req, res) => {

        // get email
        // find user based on email
        // reset token + reset expiry => Date.now + 10*60*100 
        // user.save()
        // send mail => design url

        const {email} = req.body;
        if(!email){
            throw new ApiError(400, "Field must not be empty");
        }

        const user = await User.findOne({ email });

        if(!user)
        {
            throw new ApiError(404, "Invalid email");
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token
        user.resetPasswordExpires = (Date.now() + 10*60*1000)

        await user.save();
        
        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Your Password",
            text: `You requested to reset your password. Click the following link to proceed: localhost:5173/forget-password/${token}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                    <h2>Reset Your Password</h2>
                    <p>Hello,</p>
                    <p>You requested a password reset. Click the button below to set a new password:</p>
                    <a href="http://localhost:5173/forget-password/${token}" 
                        style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
                        Reset Password
                    </a>
                    <p>If you did not request this, you can safely ignore this email.</p>
                    <p>Thanks,<br/>The Team</p>
                </div>
            `
        };


    await transporter.sendMail(mailOption)

    return res.status(200).json(
        new ApiResponse(200,{user}, "Check your Email")
    ) 
}

const resetPassword = async (req, res) => {
    
        // collect token from params
        // password from req.body
        const {token} = req.params;
        const {password} = req.body;
        

        try {
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: {$gt: Date.now()}
            })

            if(!user){
                throw new ApiError(400, "Invalid token or reset time expired");
            }

            user.password = password;
            user.resetPasswordExpires = undefined;
            user.resetPasswordToken = undefined;

            await user.save();

            res.status(200).json(
                new ApiResponse(200,{user}, "Password reset successfully")
            )

        } catch (error) {
            throw new ApiError(500, "Failed to reset password");
        }
    
}

// const uploadProfilePicture = asyncHandler(async (req, res) => {
//     const userId = req.user._id;
//     const { image } = req.body;

//     if (!image) {
//         throw new ApiError(400, "Image is required");
//     }

//     // Upload the profile picture to Cloudinary
//     const result = await uploadOnCloudinary(image);

//     if (!result) {
//         throw new ApiError(500, "Failed to upload profile picture");
//     }

//     // Update the user's profile picture in the database
//     const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { profilePicture: result.secure_url },
//         { new: true }
//     );

//     if (!updatedUser) {
//         throw new ApiError(404, "User not found");
//     }

//     return res.json(new ApiResponse(200, "Profile picture uploaded successfully", updatedUser));
// })


const logoutUser = asyncHandler(async (req, res) => {
    console.log(1);
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { 
                refreshToken: undefined 
            }
        },
        {
            new: true
        }
    )


    const options={
        httpOnly: true,
        secure: true,
        sameSite:"None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, "User logged out successfully"));


});

const refreshAccessToken = asyncHandler(async (req, res) => {
    console.log("refreshAccessToken");
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if(!incomingRefreshToken)
    {
        throw new ApiError(401, "Unauthorized");
    }
    console.log("done1")

   try {
     const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
 
     if(!decodedToken)
     {
         throw new ApiError(401, "Unauthorized");
     }
     
     console.log("done2")
     const user = await User.findById(decodedToken._id);
     
     if(!user)
     {
         throw new ApiError(401, "Unauthorized");
     }
 
     if(user.refreshToken !== incomingRefreshToken)
     {
         throw new ApiError(401, "Refresh Token is expired or used");
     }
 
     const tokens= await generateAccessAndRefreshTokens(user._id);
 
     const { accessToken, refreshToken } = tokens;
     const options={
         httpOnly: true,
         secure: false,
         sameSite:"None",
         maxAge: 7 * 24 * 60 * 60 * 1000
     } 
 
     return res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", refreshToken, options)
     .json(new ApiResponse(200, {accessToken, refreshToken,user},"Access token refreshed successfully"));
 
 
   } catch (error) {
     throw new ApiError(500, "Failed to refresh access token");
   }
            

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required");
  }  

  const user = await User.findById(req.user._id);

  if(!user)
  {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if(!isPasswordValid)
  {
    throw new ApiError(401, "Invalid password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
  .status(200)
  .json(new ApiResponse(200, "Password changed successfully"));

})

const getUserById = asyncHandler(async (req, res) => {
    const {userId} = req.body;

    if(!userId){
        throw new ApiError(400, "user id is required");
    }
    const user = await User.findById(userId).select("-password -refreshToken");

    if(!user){
        throw new ApiError(400, "Invalid user id");
    }
    
    console.log("UserId", user);

  return res
  .status(200)
  .json(new ApiResponse(200, user, "User retrieved successfully"));
})

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    throw new ApiError(400, "First name, last name, and email are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        firstName,
        lastName,
        email,
      },
    },
    {
      new: true,
    }).select("-password -refreshToken");

  return res
  .status(200)
  .json(new ApiResponse(200, {user},"Account details updated successfully"));
})

const sendOTPVerificationEmail = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        if(!email)
        {
            throw new ApiError(400, "Email is required");
        }
        
        const user = await User.findOne({ email });
        
        if(!user)
        {
            throw new ApiError(404, "User not found");
        }
        console.log(req.body);
        
        console.log(req.body.otpValue);
        console.log(user.otp);
           
        if(Number(req.body.otpValue)!==Number(user.otp))
        {
            throw new ApiError(400, "Invalid OTP");
        }
        const tokens = await generateAccessAndRefreshTokens(user._id);
        const { accessToken, refreshToken } = tokens;

        if(!user.isVerified){
            user.isVerified = true;
            await user.save()
        }
    
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        const options={
            httpOnly: true,
            secure: true,
            sameSite:"None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
        console.log("access Token",accessToken)
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                  {user:loggedInUser, accessToken, refreshToken},
                 "User logged in successfully")
        );
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, error.message));
    }
})

const updateProfilePicture = asyncHandler(async (req, res) => {
    
    if(!req.file)
    {
        throw new ApiError(400, "Profile picture is required");
    }
    const result = await uploadToCloudinary(req.file.path);
    console.log(1);
    
    console.log(req.user);
    req.user.profilePicture = result.secure_url;
    await req.user.save();
    return res.status(200).json(new ApiResponse(200, "Profile picture updated successfully", req.user));
})


export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getUserById,
    updateAccountDetails,
    updateProfilePicture,
    sendOTPVerificationEmail,
    forgetPassword,
    resetPassword
 };
