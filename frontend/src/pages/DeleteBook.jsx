import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
	TextField,
	Button,
	Container,
	Typography,
	Box,
	CircularProgress,
} from "@mui/material";
import axios from "axios";

const EditBook = () => {
	const [book, setBook] = useState({
		title: "",
		author: "",
		publishYear: "",
		synopsis: "",
	});
	const [loading, setLoading] = useState(false);
	const [fetchingBook, setFetchingBook] = useState(true);
	const navigate = useNavigate();
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		setFetchingBook(true);
		axios
			.get(`http://localhost:6000/api/books/${id}`)
			.then((response) => {
				setBook(response.data);
				setFetchingBook(false);
			})
			.catch((error) => {
				console.log(error);
				setFetchingBook(false);
				enqueueSnackbar("Error fetching book details", { variant: "error" });
			});
	}, [id, enqueueSnackbar]);

	const handleChange = (e) => {
		setBook({ ...book, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.put(`http://localhost:6000/api/books/${id}`, book)
			.then(() => {
				setLoading(false);
				enqueueSnackbar("Book updated successfully", { variant: "success" });
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar("Error updating book", { variant: "error" });
				console.log(error);
			});
	};

	if (fetchingBook) {
		return (
			<Container
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}>
				<CircularProgress />
			</Container>
		);
	}

	return (
		<Container maxWidth="sm">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom>
				Edit Book
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="title"
					label="Title"
					name="title"
					autoFocus
					value={book.title}
					onChange={handleChange}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="author"
					label="Author"
					name="author"
					value={book.author}
					onChange={handleChange}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="publishYear"
					label="Publish Year"
					name="publishYear"
					type="number"
					value={book.publishYear}
					onChange={handleChange}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="synopsis"
					label="Synopsis"
					name="synopsis"
					multiline
					rows={4}
					value={book.synopsis}
					onChange={handleChange}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={loading}>
					{loading ? "Updating..." : "Update Book"}
				</Button>
			</Box>
		</Container>
	);
};

export default EditBook;
