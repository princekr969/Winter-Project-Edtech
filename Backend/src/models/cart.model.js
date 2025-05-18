import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    }
}, {timestamps: true})

export const Cart = mongoose.model("Cart", cartSchema);