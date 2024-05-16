import { Button, Card, Col, Tab, Tabs } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import ReportCard from "../../components/admin/ReportCard";
import Pagination from "../../components/shared/pagination/Pagination";

let pageSize = 12;

const ViewInstructorCourseReports = () => {
  const navigate = useNavigate();
  const [Reports, setReports] = useState([]);
  const [reportsCurrentPage, setReportsCurrentPage] = useState(1);
  let reportsFirstPageIndex = (reportsCurrentPage - 1) * pageSize;
  let reportsLastPageIndex = reportsFirstPageIndex + pageSize;
  let currentReports = Reports.slice(
    reportsFirstPageIndex,
    reportsLastPageIndex,
  );

  const [Resolved, setResolved] = useState([]);
  const [resolvedCurrentPage, setResolvedCurrentPage] = useState(1);
  let resolvedFirstPageIndex = (resolvedCurrentPage - 1) * pageSize;
  let resolvedLastPageIndex = resolvedFirstPageIndex + pageSize;
  let currentResolved = Resolved.slice(
    resolvedFirstPageIndex,
    resolvedLastPageIndex,
  );

  const [Pending, setPending] = useState([]);
  const [pendingCurrentPage, setPendingCurrentPage] = useState(1);
  let pendingFirstPageIndex = (pendingCurrentPage - 1) * pageSize;
  let pendingLastPageIndex = pendingFirstPageIndex + pageSize;
  let currentPending = Pending.slice(
    pendingFirstPageIndex,
    pendingLastPageIndex,
  );

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
        : oldReport,
    );
    setReports(newReports);
  };

  const SeenReport = (report) => {
    let newReports = Reports.map((oldReport) =>
      oldReport._id === report._id ? { ...oldReport, isSeen: true } : oldReport,
    );
    setReports(newReports);
    let newPendingReports = Pending.map((oldReport) =>
      oldReport._id === report._id ? { ...oldReport, isSeen: true } : oldReport,
    );
    setPending(newPendingReports);
    let newResolvedReports = Resolved.map((oldReport) =>
      oldReport._id === report._id ? { ...oldReport, isSeen: true } : oldReport,
    );
    setResolved(newResolvedReports);
  };

  const AddComment = (comment, report) => {
    let newReports = Reports.map((oldReport) =>
      oldReport._id === report._id
        ? { ...oldReport, comments: [...report.comments, comment] }
        : oldReport,
    );
    setReports(newReports);
    let newPendingReports = Pending.map((oldReport) =>
      oldReport._id === report._id
        ? { ...oldReport, comments: [...report.comments, comment] }
        : oldReport,
    );
    setPending(newPendingReports);
    let newResolvedReports = Resolved.map((oldReport) =>
      oldReport._id === report._id
        ? { ...oldReport, comments: [...report.comments, comment] }
        : oldReport,
    );
    setResolved(newResolvedReports);
  };

  useEffect(() => {
    setReports(location.state.reports);
    let resolved = location.state.reports.filter(
      (report) => report.isResolved === true,
    );
    let pending = location.state.reports.filter(
      (report) => report.isResolved === false,
    );
    setResolved(resolved);
    setPending(pending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedItem === "Seen") {
      let pending = location.state.reports.filter(
        (report) => report.isResolved === false,
      );
      let allReports = location.state.reports;
      let seenAndPending = pending.filter((report) => report.isSeen === true);
      let allSeen = allReports.filter((report) => report.isSeen === true);
      setPending(seenAndPending);
      setReports(allSeen);
    } else if (selectedItem === "Unseen") {
      let pending = location.state.reports.filter(
        (report) => report.isResolved === false,
      );
      let allReports = location.state.reports;
      let allUnseen = allReports.filter((report) => report.isSeen === false);
      let UnseenAndPending = pending.filter(
        (report) => report.isSeen === false,
      );
      setPending(UnseenAndPending);
      setReports(allUnseen);
    } else if (selectedItem === "No-Filter") {
      let pending = location.state.reports.filter(
        (report) => report.isResolved === false,
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
        defaultActiveKey="Pending"
        className="d-flex justify-content-start reportTabs"
      >
        <Tab eventKey="Pending" title="Pending">
          <Card.Body className="d-flex justify-content-between p-1 my-2">
            <DropdownButton
              className="me-3"
              variant="pinkish"
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
            <Button
              onClick={() => navigate("/instructor/viewInstructorReports")}
            >
              Go back to All Courses
            </Button>
          </Card.Body>
          <Card.Body className="d-flex flex-wrap">
            {currentPending.map((report, i) => (
              <Col sm={4} className=" p-1 " key={i}>
                <ReportCard
                  report={report}
                  resolvingReport={ResolvingReport}
                  seenReport={SeenReport}
                  AddComment={AddComment}
                />
              </Col>
            ))}
          </Card.Body>
          <Pagination
            className="pagination-bar"
            currentPage={pendingCurrentPage}
            totalCount={Pending.length}
            pageSize={pageSize}
            onPageChange={(page) => setPendingCurrentPage(page)}
          />
        </Tab>

        <Tab eventKey="Resolved" title="Resolved">
          <Card.Body className="d-flex justify-content-end p-1 my-2">
            <Button
              onClick={() => navigate("/instructor/viewInstructorReports")}
            >
              Go back to All Courses
            </Button>
          </Card.Body>

          <Card.Body className="d-flex flex-wrap">
            {currentResolved.map((report, i) => (
              <Col sm={4} className=" p-1 " key={i}>
                <ReportCard
                  report={report}
                  seenReport={SeenReport}
                  AddComment={AddComment}
                />
              </Col>
            ))}
          </Card.Body>
          <Pagination
            className="pagination-bar"
            currentPage={resolvedCurrentPage}
            totalCount={Resolved.length}
            pageSize={pageSize}
            onPageChange={(page) => setResolvedCurrentPage(page)}
          />
        </Tab>

        <Tab eventKey="All-Reports" title="All Reports">
          <Card.Body className="d-flex justify-content-between p-1 my-2">
            <DropdownButton
              className="me-3"
              variant="pinkish"
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
            <Button
              onClick={() => navigate("/instructor/viewInstructorReports")}
            >
              Go back to All Courses
            </Button>
          </Card.Body>
          <Card.Body className="d-flex flex-wrap">
            {currentReports.map((report, i) => (
              <Col sm={4} className=" p-1 " key={i}>
                <ReportCard
                  report={report}
                  resolvingReport={ResolvingReport}
                  seenReport={SeenReport}
                  AddComment={AddComment}
                />
              </Col>
            ))}
          </Card.Body>

          <Pagination
            className="pagination-bar"
            currentPage={reportsCurrentPage}
            totalCount={Reports.length}
            pageSize={pageSize}
            onPageChange={(page) => setReportsCurrentPage(page)}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default ViewInstructorCourseReports;
