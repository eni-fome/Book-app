import express from "express";
import { Book } from "../models/bookModel.js";
import { validateBook } from "../middleware/validation.js";

const router = express.Router();

// Get all books
router.get("/", async (req, res, next) => {
	try {
		const books = await Book.find({});
		res.status(200).json({
			count: books.length,
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
router.post("/", validateBook, async (req, res, next) => {
	try {
		const newBook = await Book.create(req.body);
		res.status(201).json(newBook);
	} catch (error) {
		next(error);
	}
});

// Update a book
router.put("/:id", validateBook, async (req, res, next) => {
	try {
		const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedBook) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json(updatedBook);
	} catch (error) {
		next(error);
	}
});

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
