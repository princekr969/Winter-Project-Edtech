import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/add-course").post(verifyJWT,upload.single("imageUrl"),addCourse)
router.route("/get-all-courses").get(getAllCourses)
router.route("/update-course").post(verifyJWT,upload.single("imageUrl"),updateCourse)
router.route("/delete-course").post(verifyJWT,deleteCourse)

export default router