import api from "../functions/api";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Tab, Tabs, Container, Button, Card } from "react-bootstrap";
import MyReportCard from "../components/MyReportCard";
const MyReports = () => {
    const [myCoursesReports, setMyCoursesReports] = useState([]);
    const user = useSelector((state) => state.userReducer.user);


    async function getMyReports() {
        const response = await api.get("/reports/authors/" + user._id);
        setMyCoursesReports(response.data);
    }
    useEffect(() => {
        getMyReports();
    }, []);

    return (
        <>
            <h1>My Reports</h1>
            {myCoursesReports.map((courseReports) => (
                <Card key={courseReports._id}>
                    <Card.Header>
                        <h3>{courseReports.title}</h3>
                    </Card.Header>
                    <Card.Body>
                        {courseReports.reports.map((report) => (
                            <MyReportCard key={report._id} report={report} />
                        ))}
                    </Card.Body>
                </Card>
            ))}


        </>
    );
}
 
export default MyReports;