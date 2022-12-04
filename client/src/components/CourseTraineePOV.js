import { Button, Form, Card, Badge, Alert } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import API from "../api";
import { useSelector } from "react-redux";
import { CardHeaderProps } from "react-bootstrap/esm/CardHeader";

function CourseTraineePOV({ course }) {
	const type = useSelector((state) => state.userReducer.type);
	const url = course.previewVideo;
	return (
		<>
			<h1 fontSize="300px" className="lead">
				{course.title}
			</h1>
			{course.subjects.map((s) => {
				return (
					<Badge key={s} bg="primary">
						{s}
					</Badge>
				);
			})}
			<Alert variant="primary" className="lead">
				Price: {course.price} instead of <del>{course.originalPrice}</del>!!! (
				{course.discount})% Discount! For limited time only
			</Alert>
			<Alert variant="dark" className="lead">
				Hours: {course.hours ? course.hours : 10}
			</Alert>
			<h3 className="lead">{course.summary}</h3>
			<iframe
				width="560"
				height="315"
				src={url}
				title="Youtube Player"
				frameBorder="0"
				allowFullScreen
			/>
		</>
	);
}

export default CourseTraineePOV;
