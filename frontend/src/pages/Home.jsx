import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Container, Grid } from "@mui/material";
import BookCard from "../components/home/BooksCard";
import api from "../components/api";
import { useSnackbar } from "notistack";

const Home = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				console.log("fetching .....");
				const response = await api.get("/");
				console.log("Response:", response);
				setBooks(response.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching books:", error);
				if (error.response) {
					console.error("Response data:", error.response.data);
					console.error("Response status:", error.response.status);
				} else if (error.request) {
					console.error("No response received:", error.request);
				} else {
					console.error("Error message:", error.message);
				}
				enqueueSnackbar("Failed to fetch books", { variant: "error" });
				setLoading(false);
			}
		};

		fetchBooks();
	}, [enqueueSnackbar]);

	if (loading) {
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
		<Container maxWidth="lg">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom>
				Book List
			</Typography>
			<Grid
				container
				spacing={3}>
				{books.map((book) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						key={book._id}>
						<BookCard book={book} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Home;
