// src/components/EditBook.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import BookForm from "./BookForm";
import LoadingSpinner from "./LoadingSpinner";

const EditBook = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchBook();
	}, [id]);

	const fetchBook = async () => {
		try {
			const response = await api.get(`/books/${id}`);
			setBook(response.data);
			setLoading(false);
		} catch (err) {
			setError("Failed to fetch book details. Please try again.");
			setLoading(false);
		}
	};

	const handleSubmit = async (bookData) => {
		try {
			await api.put(`/books/${id}`, bookData);
			navigate(`/book/${id}`);
		} catch (err) {
			setError("Failed to update book. Please try again.");
			console.error("Error updating book:", err);
		}
	};

	if (loading) return <LoadingSpinner />;
	if (error) return <div className="text-red-600">{error}</div>;
	if (!book) return <div>Book not found</div>;

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-3xl font-serif text-amber-900 mb-6">Edit Book</h1>
			{error && <div className="text-red-600 mb-4">{error}</div>}
			<BookForm
				onSubmit={handleSubmit}
				initialData={book}
			/>
		</div>
	);
};

export default EditBook;
