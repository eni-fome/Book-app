// src/models/bookModel.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Book title is required"],
			trim: true,
			maxlength: [100, "Book title cannot be more than 100 characters"],
		},
		author: {
			type: String,
			required: [true, "Author name is required"],
			trim: true,
			maxlength: [50, "Author name cannot be more than 50 characters"],
		},
		publishYear: {
			type: Number,
			required: [true, "Publish year is required"],
			min: [1800, "Publish year must be 1800 or later"],
			max: [new Date().getFullYear(), "Publish year cannot be in the future"],
		},
		synopsis: {
			type: String,
			required: [true, "Book synopsis is required"],
			trim: true,
		},
		coverImage: {
			type: String,
			default: "",
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

export const Book = mongoose.model("Book", bookSchema);
