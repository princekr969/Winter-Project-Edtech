import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lesson } from "../models/lesson.model.js";
import { uploadVideoToCloudinary } from "../utils/cloudinary.js";
import { Module } from "../models/module.model.js";



const getAllLessons = asyncHandler(async (req, res) => {
    const {moduleId} = req.body;
    const module = await Module.findById(moduleId);
    if(!module)
    {
        throw new ApiError(404, "Module not found");
    }
    // console.log(module.lessons);
    
    //find all the lessons from the array of ids in module.lessons
    const lessons = await Lesson.find({ _id: { $in: module.lessons } });
    if(!lessons)
    {
        throw new ApiError(404, "Lessons not found");
    }
    res.json(new ApiResponse(200, "success", lessons));
})

const addLesson = asyncHandler(async (req, res) => {
    const {title,moduleId} = req.body;
    const lesson = await Lesson.create({title});
    
    if(!lesson)
    {
        throw new ApiError(500, "something went wrong when creating lesson");
    }
  
    const url =await uploadVideoToCloudinary(req.file.path, "lessons");
    // console.log(url);
    
    if(!url)
    {
        throw new ApiError(500, "something went wrong when uploading file");
    }
    lesson.videoUrl = url.secure_url;
    await lesson.save();
    
    
    const module = await Module.findByIdAndUpdate(moduleId, {$push: {lessons: lesson._id}}, {new: true});
    if(!module)
    {
        throw new ApiError(500, "something went wrong when adding lesson to module");
    }
    
    
    res.json(new ApiResponse(200, "success", lesson));
})

const deleteLesson = asyncHandler(async (req,res) =>{
    const {moduleId,lessonId} =req.body;
    // console.log(moduleId,lessonId);    
    const module = await Module.findByIdAndUpdate(moduleId, {$pull: {lessons: lessonId}}, {new: true});
    if(!module)
    {
        throw new ApiError(500, "something went wrong when deleting lesson from module");
    }
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if(!lesson)
    {
        throw new ApiError(500, "something went wrong when deleting lesson");
    }
    res.json(new ApiResponse(200, "success",lesson));
})



export {addLesson, getAllLessons, deleteLesson}