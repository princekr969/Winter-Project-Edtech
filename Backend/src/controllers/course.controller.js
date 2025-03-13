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

const addCourse = asyncHandler(async (req, res) => {
    const {title, description, imageUrl, price, category} = req.body;

    const course = await Course.create({
        courseId: Date.now(),
        title,
        description,
        imageUrl,
        price,
        category,
        owner: req.user._id
    });
    if(!course)
    {
        throw new ApiError(500, "something went wrong");
    }
    res.json(new ApiResponse(201, "success", course));
})

const deleteCourse = asyncHandler(async (req, res) => {
    const {courseId} = req.body.courseId;

    const course = await Course.findByIdAndDelete(courseId);

    if(!course)
    {
        throw new ApiError(500, "something went wrong");
    }

    res.json(new ApiResponse(200, "success", course));
})

const updateCourse = asyncHandler(async (req, res) => {
    const {courseId} = req.body.courseId;

    const course = await Course.findByIdAndUpdate(courseId,{
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        category: req.body.category
    },{new: true});

    if(!course)
    {
        throw new ApiError(500, "something went wrong");
    }

    res.json(new ApiResponse(200, "success", course));
})



export {getAllCourses, addCourse, deleteCourse, updateCourse}

