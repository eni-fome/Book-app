import express from "express";
import multer from "multer";
import { Book } from "../models/bookModel.js";
import { validateBook } from "../middleware/validation.js";
import { uploadToCloudinary } from "../index.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Get all books (with search, pagination, and sorting)
router.get("/", async (req, res, next) => {
	try {
		const {
			search,
			page = 1,
			limit = 10,
			sortBy = "title",
			sortOrder = "asc",
		} = req.query;
		let query = {};

		if (search) {
			query = {
				$or: [
					{ title: { $regex: search, $options: "i" } },
					{ author: { $regex: search, $options: "i" } },
					{ synopsis: { $regex: search, $options: "i" } },
				],
			};
		}

		const totalBooks = await Book.countDocuments(query);
		const totalPages = Math.ceil(totalBooks / limit);
		const skip = (page - 1) * limit;

		const sortOptions = {};
		sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

		const books = await Book.find(query)
			.sort(sortOptions)
			.skip(skip)
			.limit(Number(limit));

		res.status(200).json({
			count: books.length,
			totalPages,
			currentPage: Number(page),
			data: books,
		});
	} catch (error) {
		next(error);
	}
});

// Get a single book
router.get("/:id", async (req, res, next) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json(book);
	} catch (error) {
		next(error);
	}
});

// Create a new book
router.post(
	"/",
	upload.single("coverImage"),
	validateBook,
	async (req, res, next) => {
		try {
			const { title, author, publishYear, synopsis } = req.body;
			let coverImage = "";

			if (req.file) {
				coverImage = await uploadToCloudinary(req.file.path);
			}

			const newBook = await Book.create({
				title,
				author,
				publishYear,
				synopsis,
				coverImage,
			});

			res.status(201).json(newBook);
		} catch (error) {
			next(error);
		}
	}
);

// Update a book
router.put(
	"/:id",
	upload.single("coverImage"),
	validateBook,
	async (req, res, next) => {
		try {
			const { title, author, publishYear, synopsis } = req.body;
			let coverImage = req.body.coverImage;

			if (req.file) {
				coverImage = await uploadToCloudinary(req.file.path);
			}

			const updatedBook = await Book.findByIdAndUpdate(
				req.params.id,
				{ title, author, publishYear, synopsis, coverImage },
				{ new: true }
			);

			if (!updatedBook) {
				return res.status(404).json({ message: "Book not found" });
			}
			res.status(200).json(updatedBook);
		} catch (error) {
			next(error);
		}
	}
);

// Delete a book
router.delete("/:id", async (req, res, next) => {
	try {
		const deletedBook = await Book.findByIdAndDelete(req.params.id);
		if (!deletedBook) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json({ message: "Book deleted successfully" });
	} catch (error) {
		next(error);
	}
});

export default router;
