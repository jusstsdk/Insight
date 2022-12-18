import { Button, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import API from "../../functions/api";

function ReportCard(props) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleReport = async (data) => {
		await API.put(`reports/${props.report._id}`, data);
	};
	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title>{props.report.title}</Card.Title>
					<Card.Text className="mb-1">
						{props.report.isResolved ? "Resolved" : "Pending"}
					</Card.Text>
					<Card.Text>{props.report.author.username}</Card.Text>
					<Button
						variant="primary"
						onClick={() => {
							handleReport({ seen: true });
							props.SeenReport();
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
				<Modal.Body>{props.report.authorType}</Modal.Body>
				<Modal.Body>{props.report.description}</Modal.Body>
				<Modal.Body>{props.report.type}</Modal.Body>
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
							Resolved
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ReportCard;
