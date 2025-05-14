import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; // <-- import jsonwebtoken

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profilePicture: {
        type: String,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    coursesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    refreshToken: {
        type: String
    },
    otp: {
        type: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken:{
        type: String,
    },
    resetPasswordExpires:{
        type: Date
    }

}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema, "users");
