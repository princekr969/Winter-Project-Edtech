import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Course } from "../models/course.model.js";

const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.json(new ApiResponse(200, "success", courses));
})    

