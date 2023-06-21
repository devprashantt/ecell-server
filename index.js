import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/mongodb.js";
import cloudinary from 'cloudinary';
import cors from "cors";

import contactRoutes from "./routes/contact.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import userRoute from './routes/user.routes.js';
import eventRoute from './routes/event.routes.js';

import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = ['http://127.0.0.1:5173', '"https://ecelliiit.netlify.app"'];

app.use(cors(
    {
        origin: allowedOrigins,
        credentials: true
    }
));

app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//routes
app.use("/contact", contactRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use('/users', userRoute);
app.use('/event', eventRoute)


app.listen(process.env.PORT, () =>
    console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)
);
