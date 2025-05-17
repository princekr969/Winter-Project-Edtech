import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    id:{
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    lessons:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
    }]
}, { timestamps: true });

export const Module = mongoose.model("Module", moduleSchema);