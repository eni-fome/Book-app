import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

const CreateBook = () => {
	const [book, setBook] = useState({
		title: "",
		author: "",
		publishYear: "",
		synopsis: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const handleChange = (e) => {
		setBook({ ...book, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post("http://localhost:6000/api/books", book)
			.then(() => {
				setLoading(false);
				enqueueSnackbar("Book created successfully", { variant: "success" });
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar("Error creating book", { variant: "error" });
				console.log(error);
			});
	};

	return (
		<Container maxWidth="sm">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom>
				Create New Book
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
					{loading ? "Creating..." : "Create Book"}
				</Button>
			</Box>
		</Container>
	);
};

export default CreateBook;
