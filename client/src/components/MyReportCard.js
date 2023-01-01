import { Button, Card, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import API from "../functions/api";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

function MyReportCard({ report }) {
	const username = useSelector((state) => state.userReducer.user.username);
	const [comments, setComments] = useState(report.comments);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const CommentRef = useRef();

	const handleAddComment = async () => {
		await API.put(`reports/${report._id}/comments`, {
			username: username,
			comment: CommentRef.current.value,
		});
		report.comments.push({
			username: username,
			comment: CommentRef.current.value,
		});
		setComments(report.comments);
		CommentRef.current.value = "";
	};
	return (
		<>
			<Card bg="lightGrey">
				<Card.Body>
					<Card.Title>{report.title}</Card.Title>
					<Card.Text className="mb-1">Type : {report.type}</Card.Text>
					<Card.Text className="mb-1">
						Status : {report.isSeen ? "Seen" : "Unseen"} and{" "}
						{report.isResolved ? "Resolved" : "Pending"}
					</Card.Text>
					<Card.Text className="mb-1">
						Description : {report.description}
					</Card.Text>
					<Button
						variant="primary"
						onClick={() => {
							handleShow();
						}}
					>
						View comments
					</Button>
				</Card.Body>
			</Card>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Comments</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup>
						{comments.map((comment, i) => (
							<ListGroup.Item className="reportComments" key={i}>
								<Row>
									<Col sm={2}>
										<h6>{comment.username}:</h6>
									</Col>
									<Col>
										<h6>{comment.comment}</h6>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
					{!report.isResolved && (
						<Form.Group className="mb-3" controlId="Add comment">
							<Form.Label>Type new comment:</Form.Label>
							<Form.Control as="textarea" rows={3} ref={CommentRef} />
							<Button onClick={handleAddComment}>Add comment</Button>
						</Form.Group>
					)}
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					{!report.isResolved && (
						<Button
							variant="secondary"
							onClick={() => {
								handleReport({ resolved: true });
								resolvingReport(report);
								handleClose();
							}}
						>
							Resolve
						</Button>
					)}
				</Modal.Footer> */}
			</Modal>
		</>
	);
}

export default MyReportCard;
