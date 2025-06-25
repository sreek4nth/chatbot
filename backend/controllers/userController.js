import userModel from "../model/user.model.js";


export const getUserData = async (req, res) => {
    try {
        const userId = req.body.userId || req.query.userId || req.userId; // Ensure we get it from different sources
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID missing" });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({
            success: true,
            userData: {
                fullname: user.fullname,
                email: user.email,
                _id: user._id
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
