import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateQR } from "../controllers/payment.controller.js";


const route = Router();

route.post("/generate-qr", generateQR);

export default route;