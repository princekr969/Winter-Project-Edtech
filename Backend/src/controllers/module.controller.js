import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/course.model.js";
import { Module } from "../models/module.model.js";


const addModule = asyncHandler(async (req, res) => {
    const {title,courseId} = req.body;
    const module = await Module.create({title,courseId});
    if(!module)
    {
        console.log("herewe");
        
        throw new ApiError(500, "something went wrong when creating module");
    }
    const course = await Course.findByIdAndUpdate(courseId, {$push: {modules: module._id}}, {new: true});
    if(!course)
    {
        throw new ApiError(500, "something went wrong when adding module to course", course);
    }
    
    res.json(new ApiResponse(200, "success", module));
})

const getAllModules = asyncHandler(async (req, res) => {
    const {courseId} = req.body;
    const id=courseId.courseId;
    const course = await Course.findById(id);
    if(!course)
    {
        throw new ApiError(404, "Course not found");
    }
    //find the modules corresponding to the course.modules using the array
    const modules = await Module.find({ _id: { $in: course.modules } });
    res.json(new ApiResponse(200, "success", modules));
    
})

export {addModule,getAllModules}