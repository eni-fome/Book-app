import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js";

dotenv.config();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (file) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(file, (error, result) => {
			if (error) reject(error);
			else resolve(result.secure_url);
		});
	});
};

const app = express();
const PORT = process.env.PORT || 6000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

app.use(
	cors({
		origin: "https://liibs.onrender.com/", // This should be your frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Logging middleware
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

app.use("/api/books", booksRoute);

// Catch-all route for debugging
app.use("*", (req, res) => {
	res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
	console.error("Error details:", err);
	res.status(500).json({
		message: "Something went wrong!",
		error:
			process.env.NODE_ENV === "development"
				? err.message
				: "Internal server error",
	});
});

if (!MONGODB_URI) {
	console.error("MONGODB_URI is not defined in the environment variables");
	process.exit(1);
}

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000,
	})
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	});

export default app;
