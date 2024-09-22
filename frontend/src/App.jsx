import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { SnackbarProvider } from "notistack";
import Sidebar from "./components/sidebar";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#90caf9",
		},
		secondary: {
			main: "#f48fb1",
		},
		background: {
			default: "#121212",
			paper: "#1e1e1e",
		},
	},
	typography: {
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		h1: {
			fontSize: "2.5rem",
			fontWeight: 500,
		},
		h2: {
			fontSize: "2rem",
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
				},
			},
		},
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SnackbarProvider maxSnack={3}>
				<Box sx={{ display: "flex" }}>
					<Sidebar />
					<Box
						component="main"
						sx={{ flexGrow: 1, p: 3, mt: 8 }}>
						<Routes>
							<Route
								path="/"
								element={<Home />}
							/>
							<Route
								path="/books/create"
								element={<CreateBook />}
							/>
							<Route
								path="/books/details/:id"
								element={<ShowBook />}
							/>
							<Route
								path="/books/edit/:id"
								element={<EditBook />}
							/>
							<Route
								path="/books/delete/:id"
								element={<DeleteBook />}
							/>
						</Routes>
					</Box>
				</Box>
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
