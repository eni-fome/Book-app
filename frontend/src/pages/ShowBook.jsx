import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
	Container,
	Typography,
	Paper,
	Grid,
	CircularProgress,
	Box,
} from "@mui/material";
import { motion } from "framer-motion";

const ShowBook = () => {
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:6000/api/books/${id}`)
			.then((response) => {
				setBook(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [id]);

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

	if (!book) {
		return (
			<Container>
				<Typography
					variant="h5"
					component="h1"
					gutterBottom>
					Book not found
				</Typography>
			</Container>
		);
	}

	return (
		<Container maxWidth="md">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<Paper
					elevation={3}
					sx={{ p: 4, mt: 4 }}>
					<Grid
						container
						spacing={3}>
						<Grid
							item
							xs={12}>
							<Typography
								variant="h4"
								component="h1"
								gutterBottom>
								{book.title}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}>
							<Typography
								variant="subtitle1"
								color="text.secondary">
								Author: {book.author}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}>
							<Typography
								variant="subtitle1"
								color="text.secondary">
								Published: {book.publishYear}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}>
							<Box sx={{ mt: 2 }}>
								<Typography
									variant="h6"
									gutterBottom>
									Synopsis
								</Typography>
								<Typography variant="body1">{book.synopsis}</Typography>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</motion.div>
		</Container>
	);
};

export default ShowBook;
