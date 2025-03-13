import {Router} from "express";
import {loginUser, logoutUser, refreshAccessToken, registerUser, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateProfilePicture, sendOTPVerificationEmail} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
    registerUser
)

router.route("/login").post(loginUser);

//secured Routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-Token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account-details").post(verifyJWT,updateAccountDetails)
router.route("/update-profile-picture").post(verifyJWT,upload.single("profilePicture"),updateProfilePicture)
router.route("/verifyUser").post(sendOTPVerificationEmail)


export default router

