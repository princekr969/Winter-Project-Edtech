import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module"
    }]
    ,
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
   tags: [{
        type: String
    }],
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
