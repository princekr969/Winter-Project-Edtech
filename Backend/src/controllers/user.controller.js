import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";  // Import the Cloudinary utility
import jwt from "jsonwebtoken";

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
    const tokens = await generateAccessAndRefreshTokens(user._id);
    const { accessToken, refreshToken } = tokens;


    const options={
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
              {user:createdUser, accessToken, refreshToken},
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
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid)
    {
        throw new ApiError(401, "Invalid password");
    }


    const tokens = await generateAccessAndRefreshTokens(user._id);
    const { accessToken, refreshToken } = tokens;

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options={
        httpOnly: true,
        secure: true
    }

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

});


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
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, "User logged out successfully"));


});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken)
    {
        throw new ApiError(401, "Unauthorized");
    }

   try {
     const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
 
     if(!decodedToken)
     {
         throw new ApiError(401, "Unauthorized");
     }
 
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
         secure: true
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

const getCurrentUser = asyncHandler(async (req, res) => {
  

  return res
  .status(200)
  .json(new ApiResponse(200, req.user, "User retrieved successfully"));
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

const updateProfilePicture = asyncHandler(async (req, res) => {
    const profilePicturePath = req.file.path;

    if(!profilePicturePath)
    {
        throw new ApiError(400, "Profile picture is required");
    }

    const pfp = await uploadOnCloudinary(profilePicturePath);

    if(!pfp.url)
    {
        throw new ApiError(500, "Failed to upload profile picture");
    }
   const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { 
                profilePicture: pfp.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");

    return res
    .status(200)
    .json(new ApiResponse(200,{user},"Profile picture updated successfully"));
})


export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateProfilePicture
 };
