import { useEffect, useState } from "react";
import { Col, Tab, Tabs, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ReportCard from "../../components/admin/ReportCard";

function ViewCourseReports() {
	const [Reports, setReports] = useState([]);
	const [Resolved, setResolved] = useState([]);
	const [Pending, setPending] = useState([]);
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

	return (
		<Tabs
			id="controlled-tab-example"
			defaultActiveKey="All-Reports"
			className="d-flex justify-content-start reportTabs"
		>
			<Tab eventKey="All-Reports" title="All Reports">
				<Container className="my-2 d-flex flex-wrap">
					{Reports.map((report, i) => (
						<Col sm={3} className="mb-2 me-2">
							<ReportCard
								report={report}
								resolvingReport={ResolvingReport}
								seenRport={SeenReport}
							/>
						</Col>
					))}
				</Container>
			</Tab>
			<Tab eventKey="Resolved" title="Resolved">
				<Container className="my-2 d-flex flex-wrap">
					{Resolved.map((report, i) => (
						<Col sm={3} className="mb-2 me-2">
							<ReportCard report={report} seenRport={SeenReport} />
						</Col>
					))}
				</Container>
			</Tab>
			<Tab eventKey="Pending" title="Pending">
				<Container className="my-2 d-flex flex-wrap">
					{Pending.map((report, i) => (
						<Col sm={3} className="mb-2 me-2">
							<ReportCard
								report={report}
								resolvingReport={ResolvingReport}
								seenRport={SeenReport}
							/>
						</Col>
					))}
				</Container>
			</Tab>
		</Tabs>
	);
}

export default ViewCourseReports;
