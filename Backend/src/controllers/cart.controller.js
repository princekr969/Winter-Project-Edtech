import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/course.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";

const addItem = async (req, res) => {
    // fetch course id
    // add to user cart array
    // return data

    const {courseId} = req.body;

    if(!courseId){
        throw new ApiError(401, "Course id is required");
    }

    

    const course = await Course.findById(courseId);

    if(!course){
        throw new ApiError(402, "Invalid course id");
    }

    const {title, price, description, imageUrl} = course;

    const newCartItem = await Cart.create({title, price, description, imageUrl, courseId});

    if(!newCartItem){
        throw new ApiError(500, "cart item not added");
    }

    const user =  await User.findByIdAndUpdate(
        req.user._id,
        { $push: { cartItems: newCartItem._id } },
        { new: true }
      );

      console.log("Add cart", user);

      return res.json(new ApiResponse(201, "success", newCartItem))
}

const getCartItems = async (req, res) => {
    const {cartItemIds} = req.body;
    if (!Array.isArray(cartItemIds)) {
        throw new ApiError(404, "cart id is required");
    }   
    console.log("user Cart getCart items2", cartItemIds);
    
    const cartItems = await Cart.find({
        _id: { $in: cartItemIds },
    });
    console.log("user Cart getCart items2", cartItems);


    res.json(new ApiResponse(200, "success", cartItems));
};

const deleteCartItem = async (req, res) => {
    const {cartItemId} = req.body;
    if(!cartItemId){
        throw new ApiError(404, "item id is required");
    }
    
    const deletedItem = await Cart.findByIdAndDelete(cartItemId);
    
    if(!deletedItem){
        throw new ApiError(404, "cart item not found");
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { cartItems: cartItemId } },
      { new: true }
    );

    res.json(new ApiResponse(200, "success", deletedItem));
}

export {addItem, getCartItems, deleteCartItem};