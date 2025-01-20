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
    image: {
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
        ref: "User",
        required: true
    },
    duration: {
        type: Number, // duration in hours
        required: true
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
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
    tags: [{
        type: String
    }],
    videos: [{
        title: { type: String, required: true }, // Title of the video
        url: { type: String, required: true }, // URL where the video is hosted
        duration: { type: Number, required: true }, // Duration of the video in minutes
        isDemo: { type: Boolean, default: false }, // If true, video is free for everyone
        isPaid: { type: Boolean, default: false } // If true, video is available only for paid users
    }]
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
