import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCourse, getAllCourses, updateCourse, deleteCourse, getCourseById, getCoursesByIds } from "../controllers/course.controller.js";
import { addModule, getAllModules } from "../controllers/module.controller.js";
import { addLesson, deleteLesson, getAllLessons } from "../controllers/lesson.controller.js";


const router = Router();


router.route("/add-course").post(verifyJWT,upload.single("imageUrl"),addCourse)
router.route("/get-course-by-id").post(getCourseById)
router.route("/update-course").post(verifyJWT,upload.single("imageUrl"),updateCourse)
router.route("/delete-course").post(verifyJWT,deleteCourse)
router.route("/get-courses-by-ids").post(getCoursesByIds)
router.route("/get-all-course").get(getAllCourses);
router.route("/add-module").post(verifyJWT,addModule)
router.route("/get-all-modules").post(getAllModules)
router.route("/get-all-lessons").post(getAllLessons)
router.route("/delete-lesson").post(deleteLesson)
router.route("/add-lesson").post(upload.single("video"),addLesson)

export default router