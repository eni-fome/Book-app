// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, fetchBooks } from "../store/bookSlice";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchTerm = useSelector((state) => state.books.searchTerm);

	const handleSearch = (e) => {
		e.preventDefault();
		dispatch(fetchBooks(searchTerm));
		navigate("/");
	};

	return (
		<header className="bg-amber-800 shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-6">
					<Link
						to="/"
						className="text-white font-serif text-2xl">
						Libs
					</Link>
					<form
						onSubmit={handleSearch}
						className="flex">
						<input
							type="text"
							placeholder="Search books..."
							value={searchTerm}
							onChange={(e) => dispatch(setSearchTerm(e.target.value))}
							className="px-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-amber-600 text-white rounded-r-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500">
							Search
						</button>
					</form>
					<Link
						to="/add"
						className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500">
						Add Book
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
