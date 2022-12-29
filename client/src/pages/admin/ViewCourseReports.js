import { useEffect, useState } from "react";
import { Col, Tab, Tabs, Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ReportCard from "../../components/admin/ReportCard";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function ViewCourseReports() {
	const navigate = useNavigate();
	const [Reports, setReports] = useState([]);
	const [Resolved, setResolved] = useState([]);
	const [Pending, setPending] = useState([]);
	const [selectedItem, setSelectedItem] = useState("No-Filter");
	const location = useLocation();
	const ResolvingReport = (report) => {
		report.isResolved = true;
		setResolved([...Resolved, report]);
		let filtered = Pending.filter(function (el) {
			return el._id !== report._id;
		});
		setPending(filtered);
		let newReports = Reports.map((oldReport) =>
			oldReport._id === report._id
				? { ...oldReport, isResolved: true }
				: oldReport
		);
		setReports(newReports);
	};
	const SeenReport = (report) => {
		let newReports = Reports.map((oldReport) =>
			oldReport._id === report._id ? { ...oldReport, isSeen: true } : oldReport
		);
		setReports(newReports);
		let newPendingReports = Pending.map((oldReport) =>
			oldReport._id === report._id ? { ...oldReport, isSeen: true } : oldReport
		);
		setPending(newPendingReports);
		let newResolvedReports = Resolved.map((oldReport) =>
			oldReport._id === report._id ? { ...oldReport, isSeen: true } : oldReport
		);
		setResolved(newResolvedReports);
	};
	const AddComment = (comment, report) => {
		let newReports = Reports.map((oldReport) =>
			oldReport._id === report._id
				? { ...oldReport, comments: [...report.comments, comment] }
				: oldReport
		);
		setReports(newReports);
		let newPendingReports = Pending.map((oldReport) =>
			oldReport._id === report._id
				? { ...oldReport, comments: [...report.comments, comment] }
				: oldReport
		);
		setPending(newPendingReports);
		let newResolvedReports = Resolved.map((oldReport) =>
			oldReport._id === report._id
				? { ...oldReport, comments: [...report.comments, comment] }
				: oldReport
		);
		setResolved(newResolvedReports);
	};
	useEffect(() => {
		setReports(location.state.reports);
		let resolved = location.state.reports.filter(
			(report) => report.isResolved === true
		);
		let pending = location.state.reports.filter(
			(report) => report.isResolved === false
		);
		setResolved(resolved);
		setPending(pending);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (selectedItem === "Seen") {
			let pending = location.state.reports.filter(
				(report) => report.isResolved === false
			);
			let allReports = location.state.reports;
			let seenAndPending = pending.filter((report) => report.isSeen === true);
			let allSeen = allReports.filter((report) => report.isSeen === true);
			setPending(seenAndPending);
			setReports(allSeen);
		} else if (selectedItem === "Unseen") {
			let pending = location.state.reports.filter(
				(report) => report.isResolved === false
			);
			let allReports = location.state.reports;
			let allUnseen = allReports.filter((report) => report.isSeen === false);
			let UnseenAndPending = pending.filter(
				(report) => report.isSeen === false
			);
			setPending(UnseenAndPending);
			setReports(allUnseen);
		} else if (selectedItem === "No-Filter") {
			let pending = location.state.reports.filter(
				(report) => report.isResolved === false
			);
			let allReports = location.state.reports;
			setPending(pending);
			setReports(allReports);
		}
	}, [selectedItem]);

	return (
		<>
			<Tabs
				id="controlled-tab-example"
				defaultActiveKey="All-Reports"
				className="d-flex justify-content-start reportTabs"
			>
				<Tab eventKey="All-Reports" title="All Reports">
					<DropdownButton
						variant="dark"
						id="courseReportsFilter"
						title={selectedItem}
					>
						<Dropdown.Item
							as="button"
							onClick={() => setSelectedItem("No-Filter")}
						>
							No Filter
						</Dropdown.Item>
						<Dropdown.Item
							className="ms-auto"
							as="button"
							onClick={() => setSelectedItem("Seen")}
						>
							Seen
						</Dropdown.Item>
						<Dropdown.Item
							as="button"
							onClick={() => setSelectedItem("Unseen")}
						>
							Unseen
						</Dropdown.Item>
					</DropdownButton>
					<Container className="my-2 d-flex flex-wrap">
						{Reports.map((report, i) => (
							<Col sm={3} className="mb-2 me-2">
								<ReportCard
									report={report}
									resolvingReport={ResolvingReport}
									seenReport={SeenReport}
									AddComment={AddComment}
								/>
							</Col>
						))}
					</Container>
				</Tab>
				<Tab eventKey="Resolved" title="Resolved">
					<Container className="my-2 d-flex flex-wrap">
						{Resolved.map((report, i) => (
							<Col sm={3} className="mb-2 me-2">
								<ReportCard
									report={report}
									seenReport={SeenReport}
									AddComment={AddComment}
								/>
							</Col>
						))}
					</Container>
				</Tab>
				<Tab eventKey="Pending" title="Pending">
					<DropdownButton
						variant="dark"
						id="dropdown-item-button"
						title={selectedItem}
					>
						<Dropdown.Item
							as="button"
							onClick={() => setSelectedItem("No-Filter")}
						>
							No Filter
						</Dropdown.Item>
						<Dropdown.Item
							className="ms-auto"
							as="button"
							onClick={() => setSelectedItem("Seen")}
						>
							Seen
						</Dropdown.Item>
						<Dropdown.Item
							as="button"
							onClick={() => setSelectedItem("Unseen")}
						>
							Unseen
						</Dropdown.Item>
					</DropdownButton>
					<Container className="my-2 d-flex flex-wrap">
						{Pending.map((report, i) => (
							<Col sm={3} className="mb-2 me-2">
								<ReportCard
									report={report}
									resolvingReport={ResolvingReport}
									seenReport={SeenReport}
									AddComment={AddComment}
								/>
							</Col>
						))}
					</Container>
				</Tab>
			</Tabs>
			<Button onClick={() => navigate("/admin/viewReports")}>Go back</Button>
		</>
	);
}

export default ViewCourseReports;
