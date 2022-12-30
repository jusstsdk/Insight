import {
	Button,
	Badge,
	Card,
	CardGroup,
	Col,
	Row,
	ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../functions/api";
import { setInfo, clearInfo } from "../../redux/courseInfoSlice";

import {
	setExamsAndSubtitles,
	clearCreateCourse,
} from "../../redux/createCourseSlice";

import { addNotification } from "../../redux/notificationsSlice";

import Stars from "../Stars";
function CourseCard(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currency = useSelector((state) => state.userReducer.user.currency);

	const handleEditCourse = () => {
		dispatch(setInfo(props.course));
		dispatch(setExamsAndSubtitles(props.course));
		navigate("../createCourse", {
			state: { status: props.course.status, _id: props.course._id },
		});
	};

	const handlePublishCourse = async () => {
		await API.put(`/courses/${props.course._id}`, { status: "Published" });
		dispatch(clearInfo());
		dispatch(clearCreateCourse());
		dispatch(
			addNotification({
				title: "Create Course",
				info: "Course Published Successfully!",
				color: "success",
			})
		);
		props.setDetectChange(!props.DetectChange);
	};

	const handleCloseCourse = async () => {
		await API.put(`/courses/${props.course._id}`, { status: "Closed" });
		dispatch(clearInfo());
		dispatch(clearCreateCourse());
		dispatch(
			addNotification({
				title: "Create Course",
				info: "Course Closed Successfully!",
				color: "success",
			})
		);
		props.setDetectChange(!props.DetectChange);
	};

	const displayButtons = () => {
		switch (props.course.status) {
			case "Draft": {
				return (
					<>
						<Button className="me-3" onClick={handleEditCourse}>
							Edit Course
						</Button>
						<Button className="me-3" onClick={handlePublishCourse}>
							Publish Course
						</Button>
					</>
				);
			}
			case "Published": {
				return (
					<>
						<Button className="me-3" onClick={handleCloseCourse}>
							Close Course
						</Button>
					</>
				);
			}
		}
	};

	return (
		<Card className="my-3">
			<Card.Body>
				{/* Title and Stars */}
				<CardGroup as={Row} className=" align-items-center">
					<Card.Title className="courseCardTitle">
						{props.course.title}
					</Card.Title>
					<p className="textFit my-auto text-muted">
						{props.course.totalHours} Hours
					</p>
					<Col sm={6} className="ms-3">
						{props.course.subjects.map((subject, i) => (
							<Badge key={"subject_badge_" + i} className="p-2 mx-1 ">
								{subject}
							</Badge>
						))}
					</Col>
					<Col className="starsContainer" sm={4} md={4} lg={2}>
						<Stars stars={props.course.rating ? props.course.rating : 0} />
					</Col>
				</CardGroup>

				{/* Summary and Price */}
				<CardGroup as={Row} className="mt-2">
					<h6 className="text-muted courseCardLabel">Summary</h6>
					<Col sm={8}>
						<Card.Text>{props.course.summary}</Card.Text>
					</Col>
					<Col sm={2} className="priceContainer d-flex justify-content-end">
						<Card.Text className="priceLabel">
							{props.course.price} {currency}
						</Card.Text>
					</Col>
				</CardGroup>

				{/* Instructors and View Course*/}
				<CardGroup as={Row} className="align-items-center">
					<h6 className="text-muted courseCardLabel my-1">Instructors</h6>
					<Col sm={4}>
						<ListGroup horizontal>
							{props.course.instructors.map((instructor, i) => (
								<Button
									className="p-0 me-2"
									variant="link"
									onClick={() =>
										navigate("/instructor/viewInstructor/" + instructor._id)
									}
									key={"instructor_" + i}
								>
									{instructor.username}
								</Button>
							))}
						</ListGroup>
					</Col>
					<Col
						className="viewCourseButton d-flex  justify-content-end align-items-center"
						sm={6}
					>
						{props.allCourses && (
							<h6 className="text-muted me-3">{props.course.status}</h6>
						)}
						{displayButtons()}
						<Button>View Course</Button>
					</Col>
				</CardGroup>
			</Card.Body>
		</Card>
	);
}
export default CourseCard;
