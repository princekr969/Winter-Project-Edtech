import mongoose from "mongoose";

    //     lessons: [{
    //         id: { type: Number },
    //         title: { type: String, required: true },
    //         videoUrl: { type: String, required: true }
    //     }]

const lessonSchema = new mongoose.Schema({
        title:{type: String, required: true},
        videoUrl:{type: String,},
})

export const Lesson = mongoose.model("Lesson", lessonSchema);