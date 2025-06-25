import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import ChatbotRouter from './routes/ChatbotRoutes.js';
import feedbackRouter from './routes/feedbackRoutes.js';


dotenv.config();

const app = express();
const allowedorgins = ['http://localhost:5173']
app.use(cors({origin:allowedorgins, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/auth', authRouter);

app.use('/api/user',userRouter)

app.use('/api/chatbot', ChatbotRouter);

app.use('/api/feedback', feedbackRouter);

app.listen(5000, () => {
    connectDB();
     console.log('Server is running on port 5000'); } );