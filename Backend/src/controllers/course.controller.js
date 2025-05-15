import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Course } from "../models/course.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";


const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.json(new ApiResponse(200, "success", courses));
})    

const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if(!course)
    {
        throw new ApiError(404, "Course not found");
    }
    res.json(new ApiResponse(200, "success", course));
})

const addCourse = asyncHandler(async (req, res) => {
    const {title, description, price, category} = req.body;
    console.log("req come");

    if (!req.file) {
        throw new ApiError(400, "Course image is required");
    }

    const result = await uploadToCloudinary(req.file.path);
    console.log("12");

    const course = await Course.create({
        title,
        description,
        price,
        category,
        imageUrl: result.secure_url,
        owner: req.user._id
    });


    console.log("creator",req.user.courses);
    console.log("course",course)

    const user =  await User.findByIdAndUpdate(
    req.user._id,
    { $push: { courses: course._id } },
    { new: true }
  );

  console.log("user", user);

    if(!course)
    {
        throw new ApiError(500, "something went wrong");
    }

    return res.json(new ApiResponse(201, "success", course));
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
        price: req.body.price,
        category: req.body.category
    },{new: true});

    if(!course)
    {
        throw new ApiError(500, "something went wrong");
    }

    res.json(new ApiResponse(200, "success", course));
})





export {getAllCourses, addCourse, deleteCourse, updateCourse, getCourseById}

