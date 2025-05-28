import {Router} from "express";
import {loginUser, forgetPassword, resetPassword, logoutUser, refreshAccessToken, registerUser, changeCurrentPassword, updateAccountDetails, updateProfilePicture, sendOTPVerificationEmail, getUserById} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { googleCallback, googleLogin } from "../controllers/oauth.controller.js";
const router = Router();

router.route("/register").post(
    registerUser
)

router.route("/login").post(loginUser);

//secured Routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-Token").get(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
// router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account-details").post(verifyJWT,updateAccountDetails)
router.route("/update-profile-picture").post(verifyJWT,upload.single("profilePicture"),updateProfilePicture)
router.route("/verifyUser").post(sendOTPVerificationEmail)
router.post("/forget-password", forgetPassword)
router.post("/reset/password/:token", resetPassword);
router.post("/get-user", getUserById);
router.get("/google/login", googleLogin);
router.get("/google/callback", googleCallback);


export default router

