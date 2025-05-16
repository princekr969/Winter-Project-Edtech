import { Router } from "express";
import { addLesson } from "../controllers/lesson.controller.js";
import { upload } from "../middlewares/multer.middleware.js";




const router = Router();


router.route("/add-lesson").post(upload.single("video"),addLesson)


export default router