import { useEffect, useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import BookIcon from "@mui/icons-material/Book";
import Toolbar from "@mui/material/Toolbar";

import {
	Box,
	Collapse,
	List,
	IconButton,
	Drawer,
	Divider,
	Typography,
	AppBar,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useDispatch, useSelector } from "react-redux";
import WatchVideo from "../components/course/WatchVideo";
import { Breadcrumb, Button } from "react-bootstrap";

import {
	setSubtitleIndex,
	setSelectedContentIndex,
	setContent,
	setContentType,
	initializeAnswers,
	setIsSolved,
} from "../redux/continueCourseSlice";
import SolveExercise from "../components/course/SolveExercise";
import { useLocation } from "react-router-dom";
const drawerWidth = "20%";

export default function ContinueCourse(props) {
	const location = useLocation();
	const dispatch = useDispatch();
	// MUI Setup
	const { window } = props;
	const container = window !== undefined ? () => window().document.body : undefined;
	const [mobileOpen, setMobileOpen] = useState(false);
	const CourseId = location.state.courseId;
	const Course = location.state.course;
	const user = useSelector((state) => state.userReducer.user);

	// Gets Course Index in the User's Courses.
	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === CourseId
	);

	const Subtitles = useSelector((state) => state.userReducer.user.courses[courseIndex].subtitles);

	// Subtitle Collapses State
	const [openCollapses, setOpenCollapses] = useState(new Array(Subtitles.length).fill(false));

	// Current Content
	// Intially, the Content displayed depends on course.lastDone where SubtitleIndex and ContentIndex are intiallized with the last Content in the last Subtitle  in which the trainee made progress.
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const SelectedContentIndex = useSelector(
		(state) => state.continueCourseReducer.selectedContentIndex
	);
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const ContentType = useSelector((state) => state.continueCourseReducer.contentType);

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
			dispatch(initializeAnswers([]));
		} else {
			dispatch(setContentType("Exercise"));
			let newAnswers = new Array(content.questions.length);
			content.questions.map((question, questionIndex) => {
				newAnswers[questionIndex] = { questionId: question._id, choice: "" };
			});
			dispatch(initializeAnswers(newAnswers));
			dispatch(setIsSolved(false));
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
			if (nextContent[0].type === "Exercise") {
				let newAnswers = new Array(nextContent[0].questions.length);
				nextContent[0].questions.map((question, questionIndex) => {
					newAnswers[questionIndex] = { questionId: question._id, choice: "" };
				});
				dispatch(initializeAnswers(newAnswers));
				dispatch(setIsSolved(false));
			} else {
				dispatch(initializeAnswers([]));
			}
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
				if (nextSubtitleContent[0].type === "Exercise") {
					let newAnswers = new Array(nextSubtitleContent[0].questions.length);
					nextSubtitleContent[0].questions.map((question, questionIndex) => {
						newAnswers[questionIndex] = { questionId: question._id, choice: "" };
					});
					dispatch(initializeAnswers(newAnswers));
					dispatch(setIsSolved(false));
				} else {
					dispatch(initializeAnswers([]));
				}
				let openCollapsesArray = [...openCollapses].map((_, index) => index === SubtitleIndex + 1);
				setOpenCollapses(openCollapsesArray);
			}
		}
	};

	useEffect(() => {
		if (SubtitleIndex === -1 && SelectedContentIndex === -1) {
			let content;
			let contentIndex;
			let IsThereContent = Subtitles.find((subtitle, subtitleIndex) => {
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
					if (content.type === "Exam") {
						let newAnswers = new Array(content.questions.length);
						content.questions.map((question, questionIndex) => {
							newAnswers[questionIndex] = { questionId: question._id, choice: "" };
						});
						dispatch(initializeAnswers(newAnswers));
						dispatch(setIsSolved(false));
					} else {
						dispatch(initializeAnswers([]));
					}
					let openCollapsesArray = [...openCollapses].map((_, index) => index === subtitleIndex);
					setOpenCollapses(openCollapsesArray);
				}
				return content;
			});
			if (!IsThereContent) console.log("Go to Exam");
		} else {
			let openCollapsesArray = [...openCollapses].map((_, index) => index === SubtitleIndex);
			setOpenCollapses(openCollapsesArray);
		}
	}, []);
	const mainNavbar = document.getElementById("main-navbar");
	const continueCourseBreadcrumbs = document.getElementById("continueCourseBreadcrumbs");

	// Displays the Drawer Content based on props.subtitles
	const drawer = (
		<div className="mb-5">
			<Toolbar
				sx={{
					marginTop: {
						sm: `${mainNavbar ? mainNavbar.offsetHeight : ""}px`,
					},
				}}
			/>
			<List id="drawerList">
				{Subtitles.map((subtitle, subtitle_index) => (
					<>
						{/* Subtitle Icon and Title */}
						<ListItem
							key={`subtitle_${subtitle._id}_title_and_icon_${subtitle_index}`}
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
							key={`subtitle_${subtitle._id}_collapse_${subtitle_index}`}
							in={openCollapses[subtitle_index]}
							timeout="auto"
							unmountOnExit>
							<List
								key={`subtitle_${subtitle._id}_collapse_list_${subtitle_index}`}
								component="div"
								disablePadding>
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
														singleContent.receivedGrade / singleContent.maxGrade >= 0.5
															? "success me-3"
															: singleContent.isSolved &&
															  singleContent.receivedGrade / singleContent.maxGrade < 0.5
															? "error me-3"
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
						<Divider key={`subtitle_${subtitle._id}_divider_${subtitle_index}`} />
					</>
				))}
			</List>
		</div>
	);
	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position="fixed" style={{ zIndex: "3", backgroundColor: "grey" }}>
				<Toolbar
					id="continueCourseBreadcrumbs"
					className="continueCourseBreadcrumbs"
					sx={{ marginTop: { sm: `${mainNavbar ? mainNavbar.offsetHeight : ""}px` } }}>
					{Subtitles[SubtitleIndex] && (
						<Breadcrumb>
							<Breadcrumb.Item>{Course.title}</Breadcrumb.Item>
							<Breadcrumb.Item>{Subtitles[SubtitleIndex].title}</Breadcrumb.Item>
							<Breadcrumb.Item>{Content.title}</Breadcrumb.Item>
						</Breadcrumb>
					)}
					<Button variant="link" className="ms-auto" onClick={handleNext}>
						Next
					</Button>
				</Toolbar>
			</AppBar>
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
				key={`course_${CourseId}_drawer_box`}
				className="drawerZ-index"
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders">
				{/* Small Screen Drawer */}
				<Drawer
					key={`course_${CourseId}_small_screen_drawer`}
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
					key={`course_${CourseId}_normal_screen_drawer`}
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
				id="asd"
				key={`course_${CourseId}_content_box`}
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: {
						sm: `calc(100% - ${drawerWidth}px)`,
					},
					marginTop: {
						sm: `${mainNavbar ? mainNavbar.offsetHeight : ""}px`,
					},
				}}>
				{ContentType === "Video" ? (
					<WatchVideo key={`course_${CourseId}_WatchVideo`} CourseId={CourseId} />
				) : ContentType === "Exercise" ? (
					<SolveExercise key={`course_${CourseId}_SolveExercise`} CourseId={CourseId} />
				) : (
					""
				)}
			</Box>
		</Box>
	);
}
