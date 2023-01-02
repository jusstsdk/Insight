import { Button, Card, Row, Col, Form, CardGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import API from "../functions/api";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

function MyReportCard({ report, detectChange, setDetectChange }) {
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
		setDetectChange(!detectChange);
		CommentRef.current.value = "";
	};
	return (
		<>
			<Card bg="lightGrey" className="h-100">
				<Card.Body className="d-flex flex-column justify-content-between">
					<Row className="justify-content-between align-items-center">
						<Card.Title className="fitWidth">{report.title}</Card.Title>
						{report.isSeen ? (
							<BsFillEyeFill className="fitWidth" />
						) : (
							<BsFillEyeSlashFill className="fitWidth" />
						)}
					</Row>
					<Row>
						<CardGroup className="mb-2">
							<h6 className="text-muted my-auto me-2">Type</h6>
							<Col sm={3}>
								<Card.Text className="fitWidth my-auto">{report.type}</Card.Text>
							</Col>
						</CardGroup>
						<CardGroup className="mb-2">
							<h6 className="text-muted my-auto me-2">Status</h6>
							<Col sm={3}>
								<Card.Text className="fitWidth my-auto">
									{report.isResolved ? "Resolved" : "Pending"}
								</Card.Text>
							</Col>
						</CardGroup>
						<Card.Text>
							{report.description.length < 200
								? report.description
								: report.description.substring(0, 200) + "..."}
						</Card.Text>
					</Row>

					{/* <Card.Text className="mb-1">Description : {report.description}</Card.Text> */}
					<Button
						className="fitWidth ms-auto mt-3"
						variant="primary"
						onClick={() => {
							handleShow();
						}}>
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
									<Col sm={3}>
										<h6 className="text-muted my-auto me-2">{comment.username}</h6>
										{/* <h6>{comment.username}:</h6> */}
									</Col>
									<Col>
										<h6>{comment.comment}</h6>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
					{!report.isResolved && (
						<Form.Group
							className={`${comments.length === 0 ? "" : "mt-3"} d-flex flex-column`}>
							<Form.Label className="text-muted my-auto">Type new comment:</Form.Label>
							<Form.Control
								className="my-2"
								as="textarea"
								placeholder="New Comment"
								rows={3}
								ref={CommentRef}
							/>
							<Button className="ms-auto" onClick={handleAddComment}>
								Add comment
							</Button>
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
