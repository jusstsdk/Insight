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
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import WatchVideo from "../components/course/continueCourse/WatchVideo";

import {
	resetExerciseInfo,
	setContentInfo,
} from "../redux/continueCourseSlice";
import SolveExercise from "../components/course/continueCourse/SolveExercise";
import { useLocation } from "react-router-dom";
import DrawerListItems from "../components/course/continueCourse/DrawerListItems";
import ContinueCourseNavbar from "../components/course/continueCourse/ContinueCourseNavbar";
import ReportCourseModal from "../components/course/ReportCourseModal";
const drawerWidth = "20%";

export default function ContinueCourse() {
	// Setup
	const location = useLocation();
	const dispatch = useDispatch();
	// MUI Setup
	const [mobileOpen, setMobileOpen] = useState(false);
	const Course = location.state.course;
	// Page Control
	const CourseIndex = useSelector(
		(state) => state.userReducer.user.courses
	).findIndex((course) => course.course === Course._id);
	const SubtitleIndex = useSelector(
		(state) => state.continueCourseReducer.subtitleIndex
	);
	const SelectedContentIndex = useSelector(
		(state) => state.continueCourseReducer.selectedContentIndex
	);
	const Exam = useSelector(
		(state) => state.userReducer.user.courses[CourseIndex].exam
	);
	const Subtitles = useSelector(
		(state) => state.userReducer.user.courses[CourseIndex].subtitles
	);
	// Current Content: Intially, the Content displayed depends on course.lastDone where SubtitleIndex and ContentIndex are intiallized with the last Content in the last Subtitle  in which the trainee made progress.
	const ContentType = useSelector(
		(state) => state.continueCourseReducer.contentType
	);
	const [openCollapses, setOpenCollapses] = useState(
		new Array(Subtitles.length + 1).fill(false)
	);

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
		let exercises = subtitle.exercises.map((exercise) => ({
			...exercise,
			type: "Exercise",
		}));
		let content = [...videos, ...exercises].sort((a, b) =>
			a.index > b.index ? 1 : b.index > a.index ? -1 : 0
		);
		return content;
	};

	// Gets a Content given the Content Index and Subtitle Index and assigns a type to the Content.
	const contentGetter = (subtitleIndex, contentIndex) => {
		let videos = Subtitles[subtitleIndex].videos.map((video) => ({
			...video,
			type: "Video",
		}));
		let exercises = Subtitles[subtitleIndex].exercises.map((exercise) => ({
			...exercise,
			type: "Exercise",
		}));
		let nextContent = [...videos, ...exercises].filter(
			(content) => content.index === contentIndex
		);
		return nextContent;
	};

	// Create a new Array of {questionId, emptyChoice}
	const setupExercise = (content) => {
		let newAnswers = new Array(content.questions.length);
		content.questions.map((question, questionIndex) => {
			newAnswers[questionIndex] = { questionId: question._id, choice: "" };
		});
		let correctAnswers = new Array(content.questions.length);
		content.questions.map((question, questionIndex) => {
			correctAnswers[questionIndex] = {
				questionId: question._id,
				choice: question.correctAnswer,
			};
		});
		dispatch(
			resetExerciseInfo({
				answers: newAnswers,
				correctAnswers: correctAnswers,
				oldGrade: content.receivedGrade,
			})
		);
	};

	// Setup for Exam onClick on Exam ListItem
	const handlePressOnExam = () => {
		dispatch(
			setContentInfo({
				content: Exam,
				contentType: "Exam",
				subtitleIndex: Subtitles.length,
				selectedContentIndex: Subtitles.length,
			})
		);
		setupExercise(Exam);
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

				let openCollapsesArray = [...openCollapses].map(
					(_, index) => index === SubtitleIndex + 1
				);
				setOpenCollapses(openCollapsesArray);
			}
		}
	};

	// Handles Press on Next Button
	const handlePrevious = () => {
		// Tries to get the next content in the same subtitle
		if (ContentType !== "Exam") {
			let previousContent = contentGetter(
				SubtitleIndex,
				SelectedContentIndex - 1
			);

			// Two Cases: There is more Content or No more content in the same Subtitle.
			if (previousContent.length !== 0) {
				// If there is more Content, Get the next Content.
				dispatch(
					setContentInfo({
						content: previousContent[0],
						contentType: previousContent[0].type,
						subtitleIndex: SubtitleIndex,
						selectedContentIndex: SelectedContentIndex - 1,
					})
				);
				// If the content is Exercise, it resets the Exercise info in ContinueCourseSlice.
				if (previousContent[0].type === "Exercise")
					setupExercise(previousContent[0]);
			} else {
				// If there is no more Content, Check if there is more Subtitles
				// Two Cases: No more Subtitles or There are More Subtitles

				if (SubtitleIndex - 1 >= 0) {
					// Get Content from the previous Subtitle
					let exerciseLength = Subtitles[SubtitleIndex - 1].exercises.length;
					let videosLength = Subtitles[SubtitleIndex - 1].videos.length;
					let previousContent = contentGetter(
						SubtitleIndex - 1,
						exerciseLength + videosLength - 1
					);
					dispatch(
						setContentInfo({
							content: previousContent[0],
							contentType: previousContent[0].type,
							subtitleIndex: SubtitleIndex - 1,
							selectedContentIndex: exerciseLength + videosLength - 1,
						})
					);
					// If the content is Exercise, it resets the Exercise info in ContinueCourseSlice.
					if (previousContent[0].type === "Exercise")
						setupExercise(previousContent[0]);

					let openCollapsesArray = [...openCollapses].map(
						(_, index) => index === SubtitleIndex - 1
					);
					setOpenCollapses(openCollapsesArray);
				}
			}
		} else {
			let lastSubtitle = Subtitles.length - 1;
			let exerciseLength = Subtitles[lastSubtitle].exercises.length;
			let videosLength = Subtitles[lastSubtitle].videos.length;
			let previousContent = contentGetter(
				lastSubtitle,
				exerciseLength + videosLength - 1
			);
			dispatch(
				setContentInfo({
					content: previousContent[0],
					contentType: previousContent[0].type,
					subtitleIndex: SubtitleIndex - 1,
					selectedContentIndex: exerciseLength + videosLength - 1,
				})
			);
			// If the content is Exercise, it resets the Exercise info in ContinueCourseSlice.
			if (previousContent[0].type === "Exercise")
				setupExercise(previousContent[0]);

			let openCollapsesArray = [...openCollapses].map(
				(_, index) => index === lastSubtitle
			);
			setOpenCollapses(openCollapsesArray);
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
					let openCollapsesArray = [...openCollapses].map(
						(_, index) => index === subtitleIndex
					);
					setOpenCollapses(openCollapsesArray);
				}
				return content;
			});
			// If there all content isSolved and isWatched, then it goes to the exam.
			if (!IsThereContent) handlePressOnExam();
		} else {
			// There is currently selected content, it opens only the collapse of the selected content.
			let openCollapsesArray = [...openCollapses].map(
				(_, index) => index === SubtitleIndex
			);
			setOpenCollapses(openCollapsesArray);
		}
	}, []);

	const mainNavbar = document.getElementById("main-navbar");
	// const continueCourseBreadcrumbs = document.getElementById("continueCourseBreadcrumbs");

	//report course data
	const [showReportCourseModal, setShowReportCourseModal] = useState(false);

	// Displays the Drawer Content based on props.subtitles
	const drawer = (
		<div className="mb-5">
			{/* Filler to avoid Navbar */}
			<Toolbar
				sx={{
					marginTop: {
						sm: `${mainNavbar ? mainNavbar.offsetHeight : ""}px`,
					},
				}}
			/>
			<List id="drawerList">
				{/* Subtitles Items */}
				{Subtitles.map((subtitle, subtitle_index) => (
					<>
						<DrawerListItems
							subtitle={subtitle}
							subtitle_index={subtitle_index}
							openCollapses={openCollapses}
							setOpenCollapses={setOpenCollapses}
							handleOpenCollapse={handleOpenCollapse}
							combineContent={combineContent}
							setupExercise={setupExercise}
						/>
						<Divider
							key={`subtitle_${subtitle._id}_divider_${subtitle_index}`}
						/>
					</>
				))}
				{/* Exam */}
				<ListItem
					style={{
						backgroundColor: ContentType === "Exam" ? "#939d9e" : "",
					}}
					key={`Exam_${Exam._id}_title_and_icon`}
					button
					onClick={() => {
						handlePressOnExam();
					}}
				>
					<ListItemIcon key={`Exam_${Exam._id}_listItemIcon`}>
						<ArticleIcon key={`Exam_${Exam._id}_articleIcon`} />
					</ListItemIcon>
					<ListItemText
						primary={Exam.title}
						key={`Exam_${Exam._id}_listItemTex`}
					/>
				</ListItem>

				{/* REPORT COURSE */}
				<ListItem
					style={{
						backgroundColor: "#EE1111",
					}}
					key={`REPORT_COURSE_CONTINUE_COURSE`}
					button
					onClick={() => {
						setShowReportCourseModal(true);
					}}
				>
					<ListItemIcon key={`REPORT_COURSE_listItemIcon`}>
						<ArticleIcon key={`REPORT_COURSE_articleIcon`} />
					</ListItemIcon>
					<ListItemText
						primary="Report Course"
						key={`REPORT_COURSE_listItemTex`}
					/>
				</ListItem>
			</List>
		</div>
	);

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<ContinueCourseNavbar
					Course={Course}
					handleNext={handleNext}
					handlePrevious={handlePrevious}
				/>
				{/* Menu Button */}
				<IconButton
					key={`course_${Course._id}_iconButton`}
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: "none" } }}
				>
					<MenuIcon key={`course_${Course._id}_menuIcon`} />
				</IconButton>

				{/* Drawer */}
				<Box
					key={`course_${Course._id}_drawer_box`}
					className="drawerZ-index"
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					{/* Small Screen Drawer */}
					<Drawer
						key={`course_${Course._id}_small_screen_drawer`}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>

					{/* Normal Screen Drawer */}
					<Drawer
						key={`course_${Course._id}_normal_screen_drawer`}
						variant="permanent"
						sx={{
							display: { xs: "none", sm: "block" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>

				{/* Content */}
				<Box
					id="asd"
					key={`course_${Course._id}_content_box`}
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
					}}
				>
					{ContentType === "Video" ? (
						<WatchVideo
							key={`course_${Course._id}_WatchVideo`}
							CourseTitle={Course.title}
							CourseId={Course._id}
						/>
					) : ContentType === "Exercise" ? (
						<SolveExercise
							key={`course_${Course._id}_SolveExercise`}
							CourseId={Course._id}
							setupExercise={setupExercise}
						/>
					) : (
						<SolveExercise
							key={`course_${Course._id}_SolveExam`}
							CourseId={Course._id}
						/>
					)}
				</Box>
			</Box>
			<ReportCourseModal
				course={Course}
				showReportCourseModal={showReportCourseModal}
				setShowReportCourseModal={setShowReportCourseModal}
			></ReportCourseModal>
		</>
	);
}
