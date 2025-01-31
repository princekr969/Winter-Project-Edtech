import mongoose,{Schema} from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });   

export const Subscription = mongoose.model("Subscription", subscriptionSchema);