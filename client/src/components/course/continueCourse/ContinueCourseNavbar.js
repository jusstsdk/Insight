import { Toolbar, AppBar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import API from "../../../functions/api";
import { addNotification } from "../../../redux/notificationsSlice";
export default function ContinueCourseNavbar({
	Course,
	handleNext,
	handlePrevious,
}) {
	// Setup
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Page Control
	const User = useSelector((state) => state.userReducer.user);
	const UserType = useSelector((state) => state.userReducer.type);

	const CourseIndex = useSelector(
		(state) => state.userReducer.user.courses
	).findIndex((course) => course._id === Course._id);
	const Subtitles = useSelector(
		(state) => state.userReducer.user.courses[CourseIndex].subtitles
	);
	const SubtitleIndex = useSelector(
		(state) => state.continueCourseReducer.subtitleIndex
	);
	const SelectedContentIndex = useSelector(
		(state) => state.continueCourseReducer.selectedContentIndex
	);
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const ContentType = useSelector(
		(state) => state.continueCourseReducer.contentType
	);
	const Progress = useSelector(
		(state) => state.userReducer.user.courses[CourseIndex].progress
	);
	const mainNavbar = document.getElementById("main-navbar");
	return (
		<AppBar
			position="fixed"
			style={{ zIndex: "3", backgroundColor: "#F8F8F8" }}
		>
			<Toolbar
				id="continueCourseBreadcrumbs"
				className="continueCourseBreadcrumbs"
				sx={{
					marginTop: { sm: `${mainNavbar ? mainNavbar.offsetHeight : ""}px` },
				}}
			>
				{/* Breadcrumbs */}
				<Col sm={7}>
					{/* Subtitles */}
					{Subtitles[SubtitleIndex] && (
						<Breadcrumb className="my-auto">
							<Breadcrumb.Item className="cut-text breadcrumbItem">
								{Course.title}
							</Breadcrumb.Item>
							<Breadcrumb.Item className="cut-text breadcrumbItem">
								{Subtitles[SubtitleIndex].title}
							</Breadcrumb.Item>
							<Breadcrumb.Item className="breadcrumbItem">
								{Content.title}
							</Breadcrumb.Item>
						</Breadcrumb>
					)}
					{/* Exam */}
					{ContentType === "Exam" && (
						<Breadcrumb>
							<Breadcrumb.Item className="breadcrumbItem">
								{Course.title}
							</Breadcrumb.Item>
							<Breadcrumb.Item className="breadcrumbItem">
								{Content.title}
							</Breadcrumb.Item>
						</Breadcrumb>
					)}
				</Col>
				{/* Page Naviagtion */}
				<Col sm={5}>
					<div className="ms-auto d-flex">
						{/* Progress and Get Certificate */}
						<div className="d-flex ms-auto my-auto">
							<p className="fitWidth m-auto">Progress: {Progress * 100}%</p>
							{/* Get Certificate */}
							{Progress === 1 && (
								<Button
									variant="link"
									className="ms-3"
									onClick={async () => {
										dispatch(
											addNotification({
												title: "Continue Course",
												info: "We have sent to you your Certificate.",
												color: "success",
											})
										);
										await API.post(`/courses/sendCertificate`, {
											courseTitle: Course.title,
											email: User.email,
										});
									}}
								>
									Get Certificate
								</Button>
							)}
						</div>
						{/* Previous */}
						{(SubtitleIndex !== 0 || SelectedContentIndex !== 0) && (
							<Button
								variant="link"
								className="blackText linkDecor"
								onClick={handlePrevious}
							>
								<AiOutlineArrowLeft />
								Previous
							</Button>
						)}
						{/* Next */}
						{ContentType !== "Exam" && (
							<Button
								variant="link"
								className="blackText linkDecor"
								onClick={handleNext}
							>
								Next
								<AiOutlineArrowRight />
							</Button>
						)}
						{/* View Course */}
						{ContentType === "Exam" && (
							<Button
								variant="link"
								className="ms-1 blackText linkDecor"
								onClick={() =>
									navigate(`/${UserType.toLowerCase()}/courses/${Course._id}`)
								}
							>
								View Course
							</Button>
						)}
					</div>
				</Col>
			</Toolbar>
		</AppBar>
	);
}
