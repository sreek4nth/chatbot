import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
// import transporter from "../config/nodemailer.js";


export const register = async (req, res) => {
    const { fullname, email, password, grade } = req.body;
    if (!fullname || !email || !password) {
        return res.status(400).json({ sucess: false, message: "Please fill in all fields" });
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ fullname: fullname, email, password: hashedPassword, grade });
        await user.save();

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 3600000
        });

        //send welcome email
        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: email,
        //     subject: "Welcome to SJCET chatbot",
        //     text: `Hello ${fullname},\n\nWelcome to SJCET. We are glad you are here.`
        // }
        // await transporter.sendMail(mailOptions);

        return res.json({ success: true });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 3600000
        });

        return res.json({ success: true, message: "Logged in Sucessfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/"
        });
        return res.json({ success: true, message: "Logged out" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });

    }
}