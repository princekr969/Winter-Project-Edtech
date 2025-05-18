import {Router} from "express";
import { addItem, deleteCartItem, getCartItems } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/add-item",verifyJWT, addItem);
router.post("/get-items",verifyJWT, getCartItems);
router.post("/delete-item",verifyJWT, deleteCartItem);

export default router;