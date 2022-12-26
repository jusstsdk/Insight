import { Toolbar, AppBar } from "@mui/material";
import { useSelector } from "react-redux";
import { Breadcrumb, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
export default function ContinueCourseNavbar({ Course, handleNext, handlePrevious }) {
	const navigate = useNavigate();
	// Gets Course Index in the User's Courses.
	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === Course._id
	);
	const Subtitles = useSelector((state) => state.userReducer.user.courses[courseIndex].subtitles);
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const SelectedContentIndex = useSelector(
		(state) => state.continueCourseReducer.selectedContentIndex
	);

	const Content = useSelector((state) => state.continueCourseReducer.content);
	const ContentType = useSelector((state) => state.continueCourseReducer.contentType);
	const mainNavbar = document.getElementById("main-navbar");
	return (
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
				{ContentType === "Exam" && (
					<Breadcrumb>
						<Breadcrumb.Item>{Course.title}</Breadcrumb.Item>
						<Breadcrumb.Item>{Content.title}</Breadcrumb.Item>
					</Breadcrumb>
				)}
				<div className="ms-auto">
					{(SubtitleIndex !== 0 || SelectedContentIndex !== 0) && (
						<Button variant="link" className="" onClick={handlePrevious}>
							<AiOutlineArrowLeft />
							Previous
						</Button>
					)}
					{ContentType !== "Exam" && (
						<Button variant="link" className="" onClick={handleNext}>
							Next
							<AiOutlineArrowRight />
						</Button>
					)}
					{ContentType === "Exam" && (
						<Button
							variant="link"
							className="ms-auto"
							onClick={() => navigate(`/trainee/courses/${Course._id}`)}>
							View Course
						</Button>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
}
