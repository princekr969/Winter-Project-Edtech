import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addCourse, getAllCourses, updateCourse, deleteCourse, getCourseById, getCoursesByIds } from "../controllers/course.controller.js";

const router = Router();


router.route("/add-course").post(verifyJWT,upload.single("imageUrl"),addCourse)
router.route("/get-course-by-id").get(getCourseById)
router.route("/update-course").post(verifyJWT,upload.single("imageUrl"),updateCourse)
router.route("/delete-course").post(verifyJWT,deleteCourse)
router.route("/get-courses-by-ids").post(getCoursesByIds)
router.route("/get-all-course").get(getAllCourses);

export default router