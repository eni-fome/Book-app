import axios from "axios";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export async function getAllBooks() {
	try {
		const response = await apiClient.get("/books");
		return response.data;
	} catch (error) {
		console.error("Error fetching all books:", error);
		throw error;
	}
}

export async function getBookById(id) {
	try {
		const response = await apiClient.get(`/books/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching book with id ${id}:`, error);
		throw error;
	}
}

export async function createBook(bookData) {
	try {
		const response = await apiClient.post("/books", bookData);
		return response.data;
	} catch (error) {
		console.error("Error creating book:", error);
		throw error;
	}
}

export async function updateBook(id, bookData) {
	try {
		const response = await apiClient.put(`/books/${id}`, bookData);
		return response.data;
	} catch (error) {
		console.error(`Error updating book with id ${id}:`, error);
		throw error;
	}
}

export async function deleteBook(id) {
	try {
		const response = await apiClient.delete(`/books/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting book with id ${id}:`, error);
		throw error;
	}
}

export default apiClient;
