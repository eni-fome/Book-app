// src/components/BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import LoadingSpinner from "./LoadingSpinner";

const BookDetails = () => {
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
			setError("Failed to fetch book details. Please try again later.");
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this book?")) {
			try {
				await api.delete(`/books/${id}`);
				navigate("/");
			} catch (err) {
				setError("Failed to delete the book. Please try again.");
			}
		}
	};

	if (loading) return <LoadingSpinner />;
	if (error) return <div className="text-red-600">{error}</div>;
	if (!book) return <div>Book not found</div>;

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="md:flex">
				<div className="md:flex-shrink-0">
					{book.coverImage ? (
						<img
							className="h-48 w-full object-cover md:w-48"
							src={book.coverImage}
							alt={book.title}
						/>
					) : (
						<div className="h-48 w-full md:w-48 bg-amber-300 flex items-center justify-center">
							<span className="text-amber-900 font-serif text-xl text-center p-4">
								{book.title}
							</span>
						</div>
					)}
				</div>
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-amber-600 font-semibold">
						{book.author}
					</div>
					<h1 className="mt-1 text-3xl font-serif leading-tight font-medium text-amber-900">
						{book.title}
					</h1>
					<p className="mt-2 text-gray-600">Published in {book.publishYear}</p>
					<p className="mt-4 text-gray-800">{book.synopsis}</p>
					<div className="mt-4">
						<span className="font-semibold">Rating: </span>
						{book.rating > 0 ? (
							<span className="text-yellow-400">
								{"★".repeat(book.rating)}
								{"☆".repeat(5 - book.rating)}
							</span>
						) : (
							<span className="text-gray-500">Not rated</span>
						)}
					</div>
					<div className="mt-6">
						<Link
							to={`/edit/${book._id}`}
							className="bg-amber-600 text-white px-4 py-2 rounded mr-2 hover:bg-amber-700">
							Edit
						</Link>
						<button
							onClick={handleDelete}
							className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookDetails;
