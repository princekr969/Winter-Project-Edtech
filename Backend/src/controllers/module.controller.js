import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/course.model.js";
import { Module } from "../models/module.model.js";


const addModule = asyncHandler(async (req, res) => {
    const {title,courseId} = req.body;

    const module = await Module.create({title});
    if(!module)
    {
        throw new ApiError(500, "something went wrong when creating module");
    }

    const course = Course.findByIdAndUpdate(courseId, {$push: {modules: module._id}}, {new: true});
    if(!course)
    {
        throw new ApiError(500, "something went wrong when adding module to course");
    }
    
    res.json(new ApiResponse(200, "success", module));
})