import {
	Button,
	Form,
	Card,
	Badge,
	Alert,
	ListGroup,
	Tabs,
	Tab,
	Container,
	Row,
	Col,
	Table,
	Modal,
} from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import API from "../../functions/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import CourseBasicInfo from "./CourseBasicInfo";
import newId from "../utils/newid";

function CourseTraineePOV() {
	//current course ID (STATIC FOR NOW)
	const params = useParams();
	let id = params.id;

	//PREVIEW VIDEO URL, HERE BECAUSE IM IDIOT SHOULD BE MOVED DOWN
	let url;

	//GET USER ID AND TYPE FOR WHEN REPORTING ETC
	const userID = useSelector((state) => state.userReducer.user._id);
	const userType = useSelector((state) => state.userReducer.type);

	//COURSE STATE
	const [course, setCourse] = useState();
	const [instructors, setInstructors] = useState();

	async function getCourseFromDB() {
		const response = await API.get(`courses/${id}`);

		url = response.data.previewVideo;

		let tempInstructors = [];
		response.data.instructors.map(async (instructor) => {
			try {
				const response = await API(`instructors/${instructor}`);

				tempInstructors = [...tempInstructors, response.data];

				setInstructors(tempInstructors);
			} catch (err) {
				console.log(err);
			}
		});
		setCourse(response.data);
	}

	//LOAD COURSE FROM DATABASE AND INSTRUCTORS INFO
	useEffect(() => {
		getCourseFromDB();
	}, []);

	return (
		course && (
			<>
				<Container>
					<Row>
						<Col>
							<h1 className="lead">{course.title}</h1>
						</Col>
						<Col>
							{course.subjects.map((s) => {
								return (
									<Badge key={newId()} bg="primary" className="lead">
										{s}
									</Badge>
								);
							})}
						</Col>
					</Row>
					<Tabs
						defaultActiveKey="basicInfo"
						id="uncontrolled-tab-example"
						className="mb-3"
					>
						<Tab key="basicInfo" eventKey="basicInfo" title="Basic Info">
							<CourseBasicInfo
								key={newId()}
								course={course}
								url={url}
								instructors={instructors}
							></CourseBasicInfo>
						</Tab>
						<Tab key="subtititles" eventKey="subtitles" title="Subtitles">
							<Table key={newId()} striped>
								<thead>
									<tr>
										<th>#</th>
										<th>Title</th>
										<th>Hours</th>
									</tr>
								</thead>
								<tbody>
									{course.subtitles.map((s, index) => {
										return (
											<tr>
												<td>{index + 1}</td>
												<td>{s.title ? s.title : "No Title."}</td>
												<td>{s.hours}</td>
												<td>
													<Button key={newId()}>View</Button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
							<Button>Start Exam</Button>
						</Tab>
						<Tab key="reviews" eventKey="reviews" title="Reviews">
							<Button>Add a review</Button>
							{course.reviews.map((s, index) => {
								return (
									<Card key={newId()}>
										<Card.Img key={newId()} />
										<Card.Body key={newId()}>
											<Card.Title key={newId()}>
												<Row key={newId()}>
													<Col key={newId()}> {s.trainee}</Col>
													<Col key={newId()}>{s.rating}</Col>
												</Row>
											</Card.Title>
											<Card.Text key={newId()}>{s.review}</Card.Text>
										</Card.Body>
									</Card>
								);
							})}
						</Tab>
					</Tabs>
				</Container>
			</>
		)
	);
}

export default CourseTraineePOV;
