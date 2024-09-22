// src/utils/api.js
import axios from "axios";

const api = axios.create({
	baseURL: "https://libs.onrender.com/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
