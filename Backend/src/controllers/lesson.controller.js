import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lesson } from "../models/lesson.model.js";
import { uploadVideoToCloudinary } from "../utils/cloudinary.js";


const addLesson = asyncHandler(async (req, res) => {
    const {lessonId, title,moduleId} = req.body;
    const lesson = await Lesson.create({title});
    if(!lesson)
    {
        throw new ApiError(500, "something went wrong when creating lesson");
    }

    console.log(req.file.path);
    
    const url =await uploadVideoToCloudinary(req.file.path, "lessons");
    if(!url)
    {
        throw new ApiError(500, "something went wrong when uploading file");
    }
    lesson.videoUrl = url.secure_url;
    await lesson.save();

    const module = await Lesson.findByIdAndUpdate(moduleId, {$push: {lessons: lesson._id}}, {new: true});
    if(!module)
    {
        throw new ApiError(500, "something went wrong when adding lesson to module");
    }
    
    res.json(new ApiResponse(200, "success", lesson));
})



export {addLesson}