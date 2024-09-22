import React from "react";
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
	return (
		<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography
					gutterBottom
					variant="h5"
					component="div">
					{book.title}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary">
					By {book.author}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary">
					Published: {book.publishYear}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					component={Link}
					to={`/books/details/${book._id}`}>
					View Details
				</Button>
				<Button
					size="small"
					component={Link}
					to={`/books/edit/${book._id}`}>
					Edit
				</Button>
			</CardActions>
		</Card>
	);
};

export default BookCard;
