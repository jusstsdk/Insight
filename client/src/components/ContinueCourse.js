import { useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import BookIcon from "@mui/icons-material/Book";
import Toolbar from "@mui/material/Toolbar";
import YoutubeEmbed from "./YoutubeEmbed";
import { Collapse } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
const drawerWidth = 240;

export default function ContinueCourse(props) {
	// MUI Setup
	const { window } = props;
	const container = window !== undefined ? () => window().document.body : undefined;
	const [mobileOpen, setMobileOpen] = useState(false);

	// Subtitle Collapses State
	const [openCollapses, setOpenCollapses] = useState(new Array(props.subtitles.length).fill(false));

	// Current Content
	const [Content, setContent] = useState({});
	const [ContentType, setContentType] = useState("_");

	//
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleOpenCollapse = (index) => {
		let openCollapsesArray = [...openCollapses];
		openCollapsesArray[index] = !openCollapsesArray[index];
		setOpenCollapses(openCollapsesArray);
	};

	const handlePressOnContent = (content) => {
		setContent(content);
		if (content.type === "Video") {
			setContentType("Video");
		} else {
			setContentType("Exercise");
		}
	};

	const combineContent = (subtitle) => {
		let videos = subtitle.videos.map((video) => ({ ...video, type: "Video" }));
		let exercises = subtitle.exercises.map((exercise) => ({ ...exercise, type: "Exercise" }));
		let content = [...videos, ...exercises].sort((a, b) =>
			a.index > b.index ? 1 : b.index > a.index ? -1 : 0
		);
		return content;
		// let exercises = subtitle.videos;
	};

	const drawer = (
		<div className="mt-3 mb-5">
			<Toolbar />
			<List>
				{props.subtitles.map((subtitle, subtitle_index) => (
					<>
						{/* Subtitle Icon and Title */}
						<ListItem
							key={`subtitle_title_${subtitle._id}`}
							button
							onClick={() => handleOpenCollapse(subtitle_index)}>
							<ListItemIcon>
								<BookIcon />
							</ListItemIcon>
							<ListItemText primary={subtitle.title} />
							{openCollapses[subtitle_index] ? <ExpandLess /> : <ExpandMore />}
						</ListItem>

						{/* Subtitle Exercises and Videos Collapse */}
						<Collapse
							key={`subtitle_dropdown_${subtitle._id}`}
							in={openCollapses[subtitle_index]}
							timeout="auto"
							unmountOnExit>
							<List component="div" disablePadding>
								{combineContent(subtitle).map((singleContent, singleContent_index) => (
									<ListItem
										key={`subtitle_${subtitle._id}_content_${singleContent._id}`}
										button
										onClick={() => handlePressOnContent(singleContent)}>
										{/* Content Icon */}
										<ListItemIcon
											key={`subtitle_${subtitle._id}_content_${singleContent._id}_icon_${singleContent_index}`}>
											{singleContent.type === "Video" ? <OndemandVideoIcon /> : <QuizIcon />}
										</ListItemIcon>
										{/* Content Text */}
										<ListItemText
											key={`subtitle_${subtitle._id}_content_${singleContent._id}_text_${singleContent_index}`}
											inset
											className="ps-3 text-wrap"
											primary={
												singleContent.type === "Video"
													? `Video ${singleContent.index}`
													: singleContent.title
											}
										/>
									</ListItem>
								))}
							</List>
						</Collapse>
						<Divider />
					</>
				))}
			</List>
		</div>
	);

	return (
		<Box sx={{ display: "flex" }}>
			{/* Menu Button */}
			<IconButton
				color="inherit"
				aria-label="open drawer"
				edge="start"
				onClick={handleDrawerToggle}
				sx={{ mr: 2, display: { sm: "none" } }}>
				<MenuIcon />
			</IconButton>

			{/* Drawer */}
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders">
				{/* Small Screen Drawer */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}>
					{drawer}
				</Drawer>

				{/* Normal Screen Drawer */}
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
					open>
					{drawer}
				</Drawer>
			</Box>

			{/* Content */}
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
				{ContentType === "Video" ? (
					<YoutubeEmbed src={Content.url} />
				) : ContentType === "Exercise" ? (
					<h1>{Content.title}</h1>
				) : (
					""
				)}
			</Box>
		</Box>
	);
}
