import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/mongodb.js";
import cloudinary from "cloudinary";
import cors from "cors";

import contactRoute from "./routes/contact.routes.js";
import leaderboardRoute from "./routes/leaderboard.routes.js";
import userRoute from "./routes/user.routes.js";
import eventRoute from "./routes/event.routes.js";
import adminRoute from "./routes/admin.routes.js";

import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//routes
app.use("/contact", contactRoute);
app.use("/leaderboard", leaderboardRoute);
app.use("/users", userRoute);
app.use("/event", eventRoute);
app.use("/admin", adminRoute);

app.post("/github", (req, res) => {
  console.log(req.body);
});

app.listen(process.env.PORT, () =>
  console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)
);
