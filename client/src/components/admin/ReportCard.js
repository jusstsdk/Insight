import { Button, Card, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import API from "../../functions/api";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

function ReportCard(props) {
	const username = useSelector((state) => state.userReducer.user.username);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const CommentRef = useRef();
	const handleReport = async (data) => {
		await API.put(`reports/${props.report._id}`, data);
	};
	const handleAddComment = async () => {
		await API.put(`reports/${props.report._id}/comments`, {
			username: username,
			comment: CommentRef.current.value,
		});
		props.AddComment(
			{
				username: username,
				comment: CommentRef.current.value,
			},
			props.report
		);
		CommentRef.current.value = "";
	};
	return (
		<>
			<Card>
				<Card.Body>
					{!props.report.isSeen && <BsFillEyeSlashFill />}
					{props.report.isSeen && <BsFillEyeFill />}
					<Card.Title>{props.report.title}</Card.Title>
					<Card.Text className="mb-1">
						{props.report.isResolved ? "Resolved" : "Pending"}
					</Card.Text>
					<Card.Text>{props.report.author.username}</Card.Text>
					<Button
						variant="primary"
						onClick={() => {
							handleReport({ seen: true });
							props.seenReport(props.report);
							handleShow();
						}}
					>
						View details
					</Button>
				</Card.Body>
			</Card>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.report.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.report.author.username}</Modal.Body>
				<Modal.Body>{props.report.description}</Modal.Body>
				<Modal.Body>{props.report.type}</Modal.Body>
				<Modal.Body>
					<ListGroup>
						{props.report.comments.map((comment, i) => (
							<ListGroup.Item>
								<Row>
									<Col md="auto">
										<h6>{comment.username}:</h6>
									</Col>
									<Col>
										<h6>{comment.comment}</h6>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
					{!props.report.isResolved && (
						<Form.Group className="mb-3" controlId="Add comment">
							<Form.Label>Type new comment:</Form.Label>
							<Form.Control as="textarea" rows={3} ref={CommentRef} />
							<Button onClick={handleAddComment}>Add comment</Button>
						</Form.Group>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					{!props.report.isResolved && (
						<Button
							variant="secondary"
							onClick={() => {
								handleReport({ resolved: true });
								props.resolvingReport(props.report);
								handleClose();
							}}
						>
							Resolve
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ReportCard;
