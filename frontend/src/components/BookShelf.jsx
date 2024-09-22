// src/components/BookShelf.jsx
import React from "react";
import { Link } from "react-router-dom";

const BookShelf = ({ books }) => {
	if (!books || books.length === 0) {
		return <p>No books on the shelf yet.</p>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{books.map((book) => (
				<Link
					key={book._id}
					to={`/book/${book._id}`}
					className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105">
					<div className="h-64 bg-amber-100 flex items-center justify-center">
						{book.coverImage ? (
							<img
								src={book.coverImage}
								alt={book.title}
								className="h-full w-full object-cover"
							/>
						) : (
							<span className="text-4xl text-amber-800">{book.title[0]}</span>
						)}
					</div>
					<div className="p-4">
						<h2 className="font-serif text-xl font-semibold text-amber-900 mb-2">
							{book.title}
						</h2>
						<p className="text-amber-700 mb-2">{book.author}</p>
						<p className="text-gray-600 text-sm mb-2">
							Published: {book.publishYear}
						</p>
						<p className="text-gray-700 text-sm line-clamp-3">
							{book.synopsis}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default BookShelf;
