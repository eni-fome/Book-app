// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";

function App() {
	return (
		<div className="min-h-screen bg-amber-50">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<Routes>
					<Route
						path="/"
						element={<BookList />}
					/>
					<Route
						path="/book/:id"
						element={<BookDetails />}
					/>
					<Route
						path="/add"
						element={<AddBook />}
					/>
					<Route
						path="/edit/:id"
						element={<EditBook />}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
