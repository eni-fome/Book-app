// src/components/AddBook.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import BookForm from "./BookForm";

const AddBook = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const handleSubmit = async (bookData) => {
		try {
			await api.post("/books", bookData);
			navigate("/");
		} catch (err) {
			setError("Failed to add book. Please try again.");
			console.error("Error adding book:", err);
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-3xl font-serif text-amber-900 mb-6">Add New Book</h1>
			{error && <div className="text-red-600 mb-4">{error}</div>}
			<BookForm onSubmit={handleSubmit} />
		</div>
	);
};

export default AddBook;
