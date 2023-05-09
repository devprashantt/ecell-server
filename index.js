import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/mongodb.js";
import cors from "cors";

import contactRoutes from "./routes/contact.routes.js";

import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();

app.use(cors(
    {
        origin: "https://ecelliiit.netlify.app",
        credentials: true
    }
));

app.use(bodyParser.json({ limit: "30mb", extended: true }));

//routes
app.use("/contact", contactRoutes);

app.listen(process.env.PORT, () =>
    console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)
);
