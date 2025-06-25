import feedbackModel from "../model/feedback.model.js";

export const sendFeedback = async (req, res) => {
    try {
        const { name, email, message, mood } = req.body;
        if (!name || !email || !message || !mood) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newFeedback = new feedbackModel({
            name,
            email,
            message,
            mood
        });

        await newFeedback.save();
        return res.json({ success: true, message: "Feedback sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}