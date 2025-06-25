import e from 'express';
import jwt from 'jsonwebtoken';


// const userAuth = async (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).json({ success:false, error: 'Unauthorized' });
//     }

//     try {
        
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.id){
//             req.userId = decoded.id;
//             return next();
//         }
//         else{
//             return res.status(401).json({ success:false, error: error.message });
//         }

//     } catch (error) {
//         res.status(401).json({ success:false, message: error.message });
//     }
// }

const userAuth = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

export default userAuth;