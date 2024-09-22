import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import BookIcon from "@mui/icons-material/Book";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		width: drawerWidth,
		boxSizing: "border-box",
		backgroundColor: theme.palette.background.default,
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const Sidebar = () => {
	const location = useLocation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawerContent = (
		<>
			<DrawerHeader>
				<IconButton onClick={handleDrawerToggle}>
					<MenuIcon />
				</IconButton>
			</DrawerHeader>
			<List>
				{[
					{ text: "Home", icon: <HomeIcon />, path: "/" },
					{ text: "Add Book", icon: <AddIcon />, path: "/books/create" },
					{ text: "My Books", icon: <BookIcon />, path: "/my-books" },
				].map((item) => (
					<ListItem
						key={item.text}
						component={Link}
						to={item.path}
						selected={location.pathname === item.path}
						onClick={isMobile ? handleDrawerToggle : undefined}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</>
	);

	return (
		<>
			<IconButton
				color="inherit"
				aria-label="open drawer"
				edge="start"
				onClick={handleDrawerToggle}
				sx={{
					mr: 2,
					display: { sm: "none" },
					position: "fixed",
					top: 8,
					left: 8,
					zIndex: 1100,
				}}>
				<MenuIcon />
			</IconButton>
			{isMobile ? (
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}>
					{drawerContent}
				</Drawer>
			) : (
				<StyledDrawer
					variant="permanent"
					open>
					{drawerContent}
				</StyledDrawer>
			)}
		</>
	);
};

export default Sidebar;
