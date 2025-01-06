import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { createBook } from "../utils/api";

const CreateBooks = () => {
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await createBook(book);
			enqueueSnackbar("Book created successfully", { variant: "success" });
			navigate("/");
		} catch (error) {
			enqueueSnackbar("Error creating book", { variant: "error" });
		} finally {
			setLoading(false);
		}
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

export default CreateBooks;
