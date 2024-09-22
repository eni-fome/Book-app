// src/store/booksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
	"books/fetchBooks",
	async ({
		searchTerm = "",
		page = 1,
		limit = 10,
		sortBy = "title",
		sortOrder = "asc",
	}) => {
		const response = await axios.get(
			`/api/books?search=${searchTerm}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
		);
		return response.data;
	}
);

const booksSlice = createSlice({
	name: "books",
	initialState: {
		books: [],
		status: "idle",
		error: null,
		searchTerm: "",
		currentPage: 1,
		totalPages: 1,
		sortBy: "title",
		sortOrder: "asc",
	},
	reducers: {
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setSortBy: (state, action) => {
			state.sortBy = action.payload;
		},
		setSortOrder: (state, action) => {
			state.sortOrder = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.books = action.payload.data || [];
				state.totalPages = action.payload.totalPages || 1;
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { setSearchTerm, setCurrentPage, setSortBy, setSortOrder } =
	booksSlice.actions;
export default booksSlice.reducer;
