import { useEffect, useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import BookIcon from "@mui/icons-material/Book";
import Toolbar from "@mui/material/Toolbar";

import { Box, Collapse, List, IconButton, Drawer, Divider } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useDispatch, useSelector } from "react-redux";
import WatchVideo from "./course/WatchVideo";
import { Button } from "react-bootstrap";

import {
	setSubtitleIndex,
	setSelectedContentIndex,
	setContent,
	setContentType,
} from "../redux/continueCourseSlice";
const drawerWidth = "20%";

export default function ContinueCourse(props) {
	const dispatch = useDispatch();
	// MUI Setup
	const { window } = props;
	const container = window !== undefined ? () => window().document.body : undefined;
	const [mobileOpen, setMobileOpen] = useState(false);

	// Gets Course Index in the User's Courses.
	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);

	const Subtitles = useSelector((state) => state.userReducer.user.courses[courseIndex].subtitles);

	// Subtitle Collapses State
	const [openCollapses, setOpenCollapses] = useState(new Array(Subtitles.length).fill(true));

	// Current Content
	// Intially, the Content displayed depends on course.lastDone where SubtitleIndex and ContentIndex are intiallized with the last Content in the last Subtitle  in which the trainee made progress.
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const SelectedContentIndex = useSelector(
		(state) => state.continueCourseReducer.selectedContentIndex
	);
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const ContentType = useSelector((state) => state.continueCourseReducer.contentType);

	// const [SubtitleIndex, setSubtitleIndex] = useState(LastDone.subtitleIndex);
	// const [Content, setContent] = useState({});
	// const [ContentType, setContentType] = useState("_");
	// const [SelectedContentIndex, setSelectedContentIndex] = useState(LastDone.contentIndex);

	//
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	// Handles click on any subtitle and displays the subtitle's content under the subtitle as sub menu.
	const handleOpenCollapse = (index) => {
		let openCollapsesArray = [...openCollapses];
		openCollapsesArray[index] = !openCollapsesArray[index];
		setOpenCollapses(openCollapsesArray);
	};

	// Handles click on any Exercise Video and Shows the Content.
	const handlePressOnContent = (content, content_index, subtitle_index) => {
		dispatch(setContent(content));
		dispatch(setSubtitleIndex(subtitle_index));
		dispatch(setSelectedContentIndex(content_index));
		let openCollapsesArray = [...openCollapses].map((_, index) => index === subtitle_index);
		setOpenCollapses(openCollapsesArray);
		if (content.type === "Video") {
			dispatch(setContentType("Video"));
		} else {
			dispatch(setContentType("Exercise"));
		}
	};

	// Combines Videos and Exercises and sort them by the attribute index. It also adds type attribute either "Video" or "Exercise".
	const combineContent = (subtitle) => {
		let videos = subtitle.videos.map((video) => ({ ...video, type: "Video" }));
		let exercises = subtitle.exercises.map((exercise) => ({ ...exercise, type: "Exercise" }));
		let content = [...videos, ...exercises].sort((a, b) =>
			a.index > b.index ? 1 : b.index > a.index ? -1 : 0
		);
		return content;
	};

	const contentGetter = (subtitleIndex, contentIndex) => {
		let videos = Subtitles[subtitleIndex].videos.map((video) => ({ ...video, type: "Video" }));
		let exercises = Subtitles[subtitleIndex].exercises.map((exercise) => ({
			...exercise,
			type: "Exercise",
		}));
		let nextContent = [...videos, ...exercises].filter((content) => content.index === contentIndex);
		return nextContent;
	};

	const handleNext = () => {
		// Tries to get the next content in the same subtitle
		let nextContent = contentGetter(SubtitleIndex, SelectedContentIndex + 1);

		// Two Cases: There is more Content or No more content in the same Subtitle.
		if (nextContent.length !== 0) {
			// If there is more Content, Get the next Content.
			dispatch(setSelectedContentIndex(SelectedContentIndex + 1));
			dispatch(setContent(nextContent[0]));
			dispatch(setContentType(nextContent[0].type));
		} else {
			// If there is no more Content, Check if there is more Subtitles
			// Two Cases: No more Subtitles or There are More Subtitles
			if (SubtitleIndex + 1 >= Subtitles.length) {
				// Go to Exam
				dispatch(setContentType("Exam"));
			} else {
				// Get Content from the next Subtitle
				let nextSubtitleContent = contentGetter(SubtitleIndex + 1, 0);
				dispatch(setSelectedContentIndex(0));
				dispatch(setContent(nextSubtitleContent[0]));
				dispatch(setContentType(nextSubtitleContent[0].type));
				dispatch(setSubtitleIndex(SubtitleIndex + 1));
			}
		}
	};

	useEffect(() => {
		if (SubtitleIndex === -1 && SelectedContentIndex === -1) {
			let content;
			let contentIndex;
			Subtitles.find((subtitle, subtitleIndex) => {
				let sortedSubtitle = combineContent(subtitle);
				content = sortedSubtitle.find((content, content_Index) => {
					if (content.type === "Video") {
						if (!content.isWatched) {
							contentIndex = content_Index;
							return content;
						}
					} else if (content.type === "Exercise") {
						if (!content.isSolved) {
							contentIndex = content_Index;
							return content;
						}
					}
				});
				if (content) {
					dispatch(setContent(content));
					dispatch(setContentType(content.type));
					dispatch(setSubtitleIndex(subtitleIndex));
					dispatch(setSelectedContentIndex(contentIndex));
				}
				return content;
			});
		}
	}, []);

	// Sets the Content and ContentType according to the SubtitleIndex and ContentIndex from the course.lastDone to show the approporiate content.
	// useEffect(() => {
	// 	if (LastDone.subtitleIndex === -1 || LastDone.contentIndex === -1) {
	// 		let videos = Subtitles[0].videos.map((video) => ({ ...video, type: "Video" }));
	// 		let exercises = Subtitles[0].exercises.map((exercise) => ({
	// 			...exercise,
	// 			type: "Exercise",
	// 		}));
	// 		let nextContent = [...videos, ...exercises].filter((content) => content.index === 0)[0];
	// 		setContent(nextContent);
	// 		setContentType(nextContent.type);
	// 		setSelectedContentIndex(0);
	// 		setSubtitleIndex(0);
	// 	} else {
	// 		let videos = Subtitles[SubtitleIndex].videos.map((video) => ({ ...video, type: "Video" }));
	// 		let exercises = Subtitles[SubtitleIndex].exercises.map((exercise) => ({
	// 			...exercise,
	// 			type: "Exercise",
	// 		}));
	// 		let nextContent = [...videos, ...exercises].filter(
	// 			(content) => content.index === SelectedContentIndex + 1
	// 		);
	// 		let selectedContent;
	// 		if (nextContent.length === 0) {
	// 			if (SubtitleIndex + 1 === Subtitles.length) {
	// 				console.log("Go to Exam");
	// 			} else {
	// 				let nextVideos = Subtitles[SubtitleIndex + 1].videos.map((video) => ({
	// 					...video,
	// 					type: "Video",
	// 				}));
	// 				let nextExercises = Subtitles[SubtitleIndex + 1].exercises.map((exercise) => ({
	// 					...exercise,
	// 					type: "Exercise",
	// 				}));
	// 				selectedContent = [...nextVideos, ...nextExercises].filter(
	// 					(content) => content.index === 0
	// 				)[0];

	// 				setSubtitleIndex(SubtitleIndex + 1);
	// 				setSelectedContentIndex(0);
	// 			}
	// 		} else {
	// 			setSelectedContentIndex(SelectedContentIndex + 1);
	// 			selectedContent = nextContent[0];
	// 		}
	// 		setContent(selectedContent);
	// 		setContentType(selectedContent.type);
	// 	}
	// }, []);

	// Displays the Drawer Content based on props.subtitles
	const drawer = (
		<div className="mt-3 mb-5">
			<Toolbar />
			<List id="drawerList">
				{Subtitles.map((subtitle, subtitle_index) => (
					<>
						{/* Subtitle Icon and Title */}
						<ListItem
							key={`subtitle_${subtitle._id}_title_${subtitle_index}`}
							button
							onClick={() => handleOpenCollapse(subtitle_index)}>
							<ListItemIcon key={`subtitle_${subtitle._id}_listItemIcon_${subtitle_index}`}>
								<BookIcon key={`subtitle_${subtitle._id}_bookIcon_${subtitle_index}`} />
							</ListItemIcon>
							<ListItemText
								primary={subtitle.title}
								key={`subtitle_${subtitle._id}_listItemText_${subtitle_index}`}
							/>
							{openCollapses[subtitle_index] ? (
								<ExpandLess key={`subtitle_${subtitle._id}_ExpandLess_${subtitle_index}`} />
							) : (
								<ExpandMore key={`subtitle_${subtitle._id}_ExpandMore_${subtitle_index}`} />
							)}
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
										style={{
											backgroundColor:
												singleContent_index === SelectedContentIndex &&
												subtitle_index === SubtitleIndex
													? "#939d9e"
													: "",
										}}
										variant={
											singleContent_index === SelectedContentIndex &&
											subtitle_index === SubtitleIndex
												? "success"
												: "danger"
										}
										onClick={() =>
											handlePressOnContent(singleContent, singleContent_index, subtitle_index)
										}>
										{/* Content Icon */}
										<ListItemIcon
											className="ms-4"
											key={`subtitle_${subtitle._id}_content_${singleContent._id}_icon_${singleContent_index}`}>
											{singleContent.type === "Video" ? (
												<OndemandVideoIcon
													className={singleContent.isWatched ? "success ms-0 me-3" : "me-3"}
													key={`subtitle_${subtitle._id}_content_${singleContent._id}_OndemandVideoIcon_${singleContent_index}`}
												/>
											) : (
												<QuizIcon
													className={
														singleContent.isSolved &&
														singleContent.receivedGrade / singleContent.receivedGrade.maxGrade >=
															0.5
															? "success me-3"
															: singleContent.isSolved &&
															  singleContent.receivedGrade / singleContent.receivedGrade.maxGrade <
																	0.5
															? "danger me-3"
															: "me-3"
													}
													key={`subtitle_${subtitle._id}_content_${singleContent._id}_QuizIcon_${singleContent_index}`}
												/>
											)}
										</ListItemIcon>
										{/* Content Text */}
										<ListItemText
											key={`subtitle_${subtitle._id}_content_${singleContent._id}_text_${singleContent_index}`}
											inset
											className="ps-0 text-wrap"
											primary={singleContent.title}
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
				className="drawerZ-index"
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
					<WatchVideo CourseId={props.CourseId} />
				) : ContentType === "Exercise" ? (
					<h1>{Content.title}</h1>
				) : (
					""
				)}
				<Button onClick={handleNext}>Next</Button>
			</Box>
		</Box>
	);
}
