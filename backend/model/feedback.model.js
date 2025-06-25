import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    mood: { type: String, required: true },
}, { timestamps: true });

const feedbackModel = mongoose.models.feedbackModel || mongoose.model("Feedback", feedbackSchema);
export default feedbackModel;
