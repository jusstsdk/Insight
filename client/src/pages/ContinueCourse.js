import { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import {
	Box,
	List,
	IconButton,
	Drawer,
	Toolbar,
	Divider,
	AppBar,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import WatchVideo from "../components/course/WatchVideo";
import { Breadcrumb, Button } from "react-bootstrap";

import { resetExerciseInfo, setContentInfo } from "../redux/continueCourseSlice";
import SolveExercise from "../components/course/SolveExercise";
import { useLocation } from "react-router-dom";
import DrawerListItems from "../components/course/DrawerListItems";
const drawerWidth = "20%";

export default function ContinueCourse() {
	const location = useLocation();
	const dispatch = useDispatch();
	// MUI Setup
	const [mobileOpen, setMobileOpen] = useState(false);
	const CourseId = location.state.courseId;
	const Course = location.state.course;

	// Gets Course Index in the User's Courses.
	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === CourseId
	);

	const Exam = useSelector((state) => state.userReducer.user.courses[courseIndex].exam);
	const Subtitles = useSelector((state) => state.userReducer.user.courses[courseIndex].subtitles);

	// Subtitle Collapses State
	const [openCollapses, setOpenCollapses] = useState(new Array(Subtitles.length + 1).fill(false));

	// Current Content: Intially, the Content displayed depends on course.lastDone where SubtitleIndex and ContentIndex are intiallized with the last Content in the last Subtitle  in which the trainee made progress.
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

	// Combines Videos and Exercises and sort them by the attribute index. It also adds type attribute either "Video" or "Exercise".
	const combineContent = (subtitle) => {
		let videos = subtitle.videos.map((video) => ({ ...video, type: "Video" }));
		let exercises = subtitle.exercises.map((exercise) => ({ ...exercise, type: "Exercise" }));
		let content = [...videos, ...exercises].sort((a, b) =>
			a.index > b.index ? 1 : b.index > a.index ? -1 : 0
		);
		return content;
	};

	// Gets a Content given the Content Index and Subtitle Index and assigns a type to the Content.
	const contentGetter = (subtitleIndex, contentIndex) => {
		let videos = Subtitles[subtitleIndex].videos.map((video) => ({ ...video, type: "Video" }));
		let exercises = Subtitles[subtitleIndex].exercises.map((exercise) => ({
			...exercise,
			type: "Exercise",
		}));
		let nextContent = [...videos, ...exercises].filter((content) => content.index === contentIndex);
		return nextContent;
	};

	// Create a new Array of {questionId, emptyChoice}
	const setupExercise = (content) => {
		let newAnswers = new Array(content.questions.length);
		content.questions.map((question, questionIndex) => {
			newAnswers[questionIndex] = { questionId: question._id, choice: "" };
		});
		dispatch(resetExerciseInfo({ answers: newAnswers, oldGrade: content.receivedGrade }));
	};

	// Setup for Exam onClick on Exam ListItem
	const handlePressOnExam = () => {
		dispatch(
			setContentInfo({
				content: Exam,
				contentType: "Exam",
				subtitleIndex: -1,
				selectedContentIndex: -1,
			})
		);
		let newAnswers = new Array(Exam.questions.length);
		Exam.questions.map((question, questionIndex) => {
			newAnswers[questionIndex] = { questionId: question._id, choice: "" };
		});
		dispatch(resetExerciseInfo({ answers: newAnswers, oldGrade: Exam.receivedGrade }));
		let openCollapsesArray = [...openCollapses].map((_, index) => index === -1);
		setOpenCollapses(openCollapsesArray);
	};

	// Handles Press on Next Button
	const handleNext = () => {
		// Tries to get the next content in the same subtitle
		let nextContent = contentGetter(SubtitleIndex, SelectedContentIndex + 1);

		// Two Cases: There is more Content or No more content in the same Subtitle.
		if (nextContent.length !== 0) {
			// If there is more Content, Get the next Content.
			dispatch(
				setContentInfo({
					content: nextContent[0],
					contentType: nextContent[0].type,
					subtitleIndex: SubtitleIndex,
					selectedContentIndex: SelectedContentIndex + 1,
				})
			);
			// If the content is Exercise, it resets the Exercise info in ContinueCourseSlice.
			if (nextContent[0].type === "Exercise") setupExercise(nextContent[0]);
		} else {
			// If there is no more Content, Check if there is more Subtitles
			// Two Cases: No more Subtitles or There are More Subtitles
			if (SubtitleIndex + 1 >= Subtitles.length) {
				// Go to Exam
				handlePressOnExam();
			} else {
				// Get Content from the next Subtitle
				let nextContent = contentGetter(SubtitleIndex + 1, 0);
				dispatch(
					setContentInfo({
						content: nextContent[0],
						contentType: nextContent[0].type,
						subtitleIndex: SubtitleIndex + 1,
						selectedContentIndex: 0,
					})
				);
				// If the content is Exercise, it resets the Exercise info in ContinueCourseSlice.
				if (nextContent[0].type === "Exercise") setupExercise(nextContent[0]);

				let openCollapsesArray = [...openCollapses].map((_, index) => index === SubtitleIndex + 1);
				setOpenCollapses(openCollapsesArray);
			}
		}
	};

	// Sets intital View by getting the Content that should be displayed first.
	useEffect(() => {
		// Intitally, there will be no content selected
		if (SubtitleIndex === -1 && SelectedContentIndex === -1) {
			// It will find the first content that should be dealt with either !isWatched or !isSolved.
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
					dispatch(
						setContentInfo({
							content: content,
							contentType: content.type,
							subtitleIndex: subtitleIndex,
							selectedContentIndex: contentIndex,
						})
					);
					let openCollapsesArray = [...openCollapses].map((_, index) => index === subtitleIndex);
					setOpenCollapses(openCollapsesArray);
				}
				return content;
			});
			// If there all content isSolved and isWatched, then it goes to the exam.
			if (!IsThereContent) handlePressOnExam();
		} else {
			// There is currently selected content, it opens only the collapse of the selected content.
			let openCollapsesArray = [...openCollapses].map((_, index) => index === SubtitleIndex);
			setOpenCollapses(openCollapsesArray);
		}
	}, []);

	const mainNavbar = document.getElementById("main-navbar");
	// const continueCourseBreadcrumbs = document.getElementById("continueCourseBreadcrumbs");

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
						<DrawerListItems
							subtitle={subtitle}
							subtitle_index={subtitle_index}
							openCollapses={openCollapses}
							setOpenCollapses={setOpenCollapses}
							handleOpenCollapse={handleOpenCollapse}
							combineContent={combineContent}
						/>
						<Divider key={`subtitle_${subtitle._id}_divider_${subtitle_index}`} />
					</>
				))}
				<ListItem
					style={{
						backgroundColor: ContentType === "Exam" ? "#939d9e" : "",
					}}
					key={`Exam_${Exam._id}_title_and_icon`}
					button
					onClick={() => {
						handlePressOnExam();
					}}>
					<ListItemIcon key={`Exam_${Exam._id}_listItemIcon`}>
						<ArticleIcon key={`Exam_${Exam._id}_articleIcon`} />
					</ListItemIcon>
					<ListItemText primary={Exam.title} key={`Exam_${Exam._id}_listItemTex`} />
				</ListItem>
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
					<SolveExercise key={`course_${CourseId}_SolveExam`} CourseId={CourseId} />
				)}
			</Box>
		</Box>
	);
}
