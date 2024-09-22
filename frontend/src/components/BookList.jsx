import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import BookShelf from "./BookShelf";
import LoadingSpinner from "./LoadingSpinner";

const BookList = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [sortBy, setSortBy] = useState("title");
	const [sortOrder, setSortOrder] = useState("asc");

	useEffect(() => {
		fetchBooks();
	}, [currentPage, sortBy, sortOrder]);

	const fetchBooks = async () => {
		try {
			setLoading(true);
			console.log("Fetching books...");
			const response = await api.get("/books", {
				params: {
					page: currentPage,
					limit: 10,
					sortBy,
					sortOrder,
				},
			});
			console.log("API Response:", response.data);
			setBooks(response.data.data);
			setTotalPages(response.data.totalPages);
			setLoading(false);
		} catch (err) {
			console.error("Error fetching books:", err);
			console.error("Error details:", err.response?.data || err.message);
			setError(
				`Failed to fetch books. ${err.response?.data?.message || err.message}`
			);
			setLoading(false);
		}
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handleSortChange = (e) => {
		const [newSortBy, newSortOrder] = e.target.value.split("-");
		setSortBy(newSortBy);
		setSortOrder(newSortOrder);
	};

	if (loading) return <LoadingSpinner />;
	if (error) return <div className="text-red-600">{error}</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-serif text-amber-900">Your Library</h1>
				<select
					onChange={handleSortChange}
					value={`${sortBy}-${sortOrder}`}
					className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500">
					<option value="title-asc">Title (A-Z)</option>
					<option value="title-desc">Title (Z-A)</option>
					<option value="author-asc">Author (A-Z)</option>
					<option value="author-desc">Author (Z-A)</option>
					<option value="publishYear-desc">Newest First</option>
					<option value="publishYear-asc">Oldest First</option>
				</select>
			</div>
			{books.length > 0 ? (
				<>
					<BookShelf books={books} />
					<div className="mt-6 flex justify-center">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={`mx-1 px-3 py-1 rounded ${
									currentPage === page
										? "bg-amber-600 text-white"
										: "bg-amber-200 text-amber-900"
								}`}>
								{page}
							</button>
						))}
					</div>
				</>
			) : (
				<p>No books available.</p>
			)}
			<Link
				to="/add"
				className="mt-4 inline-block px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">
				Add New Book
			</Link>
		</div>
	);
};

export default BookList;
