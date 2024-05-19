import axios from "axios";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Col, Breadcrumb } from "react-bootstrap";
import "../../css/createCourse.css";

import { clearInfo } from "../../redux/courseInfoSlice";
import { clearCreateCourse } from "../../redux/createCourseSlice";
import { updateInstructorCourses } from "../../redux/userSlice";

import AddInfo from "../../components/instructor/createCourse/AddInfo";
import AddExam from "../../components/instructor/createCourse/AddExam";
import AddSubtitles from "../../components/instructor/createCourse/AddSubtitles";
import API from "../../functions/api";
import { MdOutlineError } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [CurrentTab, setCurrentTab] = useState("addInfo");
  const MySwal = withReactContent(Swal);

  const instructorId = useSelector((state) => state.userReducer.user._id);
  const user = useSelector((state) => state.userReducer.user);

  const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
  const ExamQuestions = useSelector(
    (state) => state.createCourseReducer.examQuestions,
  );
  const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);

  const InfoTitle = useSelector((state) => state.courseInfoReducer.title);
  const InfoSummary = useSelector((state) => state.courseInfoReducer.summary);

  const InfoOriginalPrice = useSelector(
    (state) => state.courseInfoReducer.originalPrice,
  );
  const InfoPreviewVideo = useSelector(
    (state) => state.courseInfoReducer.previewVideo,
  );
  const [BadPreviewUrl, setBadPreviewUrl] = useState(false);

  const InfoSubjects = useSelector((state) => state.courseInfoReducer.subjects);
  //breadcrumb errors
  const [displayErrors, setDisplayErrors] = useState(false);
  const [InfoHasErrors, setInfoHasErrors] = useState(false);
  const [ExamHasErrors, setExamHasErrors] = useState(false);
  const [SubtitleHasErrors, setSubtitleHasErrors] = useState(false);
  //addInfo errors
  const [MissingCourseTitle, setMissingCourseTitle] = useState(false);
  const [InvalidPrice, setInvalidPrice] = useState(false);
  const [MissingSummary, setMissingSummary] = useState(false);
  const [MissingPreviewVideo, setMissingPreviewVideo] = useState(false);
  const [MissingSubjects, setMissingSubjects] = useState(false);
  //addSubtitles errors
  const [NoSubtitles, setNoSubtitles] = useState(false);
  const [MissingVideos, setMissingVideos] = useState(false);
  const [ExcersisesMissingQuestions, setExcersisesMissingQuestions] =
    useState(false);
  //addExam errors
  const [MissingExamTitle, setMissingExamTitle] = useState(false);

  const validatePublish = (status) => {
    setDisplayErrors(false);
    let infoHadErrors = false;
    let subtitleHadErrors = false;
    let examHadErrors = false;
    if (status === "Published") {
      if (
        InfoTitle === "" ||
        InfoSummary === "" ||
        InfoOriginalPrice === "" ||
        InfoSubjects.length === 0
      ) {
        setDisplayErrors(true);
        setInfoHasErrors(true);
        infoHadErrors = true;
      } else {
        setInfoHasErrors(false);
      }

      if (Subtitles.length === 0) {
        setDisplayErrors(true);
        setSubtitleHasErrors(true);
        subtitleHadErrors = true;
      } else {
        setSubtitleHasErrors(false);
      }

      if (infoHadErrors || subtitleHadErrors) {
        if (infoHadErrors) {
          MySwal.fire({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 4000,
            title: <strong>Info tab error</strong>,
            html: (
              <i>
                Please fill out all the fields in the info tab with valid data
              </i>
            ),
            icon: "error",
            timerProgressBar: true,
            grow: "row",
          });
        }
        if (subtitleHadErrors) {
          MySwal.fire({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 4000,
            title: <strong>Subtitles tab error</strong>,
            html: (
              <i>
                Make sure you have at least one subtitle and that each subtitle
                has at least one video and that each exercise has at least one
                question
              </i>
            ),
            icon: "error",
            timerProgressBar: true,
            grow: "row",
          });
        }
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const token = useSelector((state) => state.userReducer.token);

  const handleCreateCourse = async (status) => {
    let valid = validatePublish(status);
    if (!valid) {
      return;
    }
    const config = {
      method: "POST",
      url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
      headers: { authorization: "Bearer " + token },
      data: {
        title: InfoTitle,
        summary: InfoSummary,
        originalPrice: (InfoOriginalPrice / user.exchangeRate).toFixed(2),
        previewVideo: InfoPreviewVideo,
        instructors: [user._id],
        subjects: InfoSubjects,
        exam: { title: ExamTitle, questions: ExamQuestions },
        subtitles: Subtitles,
        status: status,
      },
    };

    try {
      const response = await axios(config);
      dispatch(updateInstructorCourses(response.data._id));

      dispatch(clearInfo());
      dispatch(clearCreateCourse());
      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Создание курса</strong>,
        html: (
          <i>{`Курс ${
            status === "Draft" ? "сохранен" : "отправлен на модерацию"
          } успешно`}</i>
        ),
        icon: "success",
        timerProgressBar: true,
        grow: "row",
      });
      navigate("/instructor/viewInstructorCourses");
    } catch (err) {
      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Создание курса</strong>,
        html: <i>{`Произошла ошибка`}</i>,
        icon: "error",
        timerProgressBar: true,
        grow: "row",
      });
    }
  };

  const handleEditCourse = async (status) => {
    try {
      let valid = validatePublish(status);
      if (!valid) {
        return;
      }

      API.put(`/courses/${location.state._id}`, {
        title: InfoTitle,
        summary: InfoSummary,
        originalPrice: InfoOriginalPrice,
        previewVideo: InfoPreviewVideo,
        instructors: [instructorId],
        subjects: InfoSubjects,
        exam: { title: ExamTitle, questions: ExamQuestions },
        subtitles: Subtitles,
        status: status,
      });
      dispatch(clearInfo());
      dispatch(clearCreateCourse());
      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Create Course</strong>,
        html: (
          <i>{`Course ${
            status === "Draft" ? "saved" : "published"
          } successfully`}</i>
        ),
        icon: "success",
        timerProgressBar: true,
        grow: "row",
      });
      navigate("/instructor/viewInstructorCourses");
    } catch (err) {
      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Create Course</strong>,
        html: (
          <i>{`Error while ${
            status === "Draft" ? "saving" : "publishing"
          } course!`}</i>
        ),
        icon: "error",
        timerProgressBar: true,
        grow: "row",
      });
    }
  };

  const displayView = () => {
    switch (CurrentTab) {
      case "addInfo":
        return (
          <AddInfo
            setCurrentTab={setCurrentTab}
            MissingCourseTitle={MissingCourseTitle}
            setMissingCourseTitle={setMissingCourseTitle}
            MissingSummary={MissingSummary}
            setMissingSummary={setMissingSummary}
            MissingSubjects={MissingSubjects}
            setMissingSubjects={setMissingSubjects}
            InvalidPrice={InvalidPrice}
            setInvalidPrice={setInvalidPrice}
            MissingPreviewVideo={MissingPreviewVideo}
            setMissingPreviewVideo={setMissingPreviewVideo}
            BadPreviewUrl={BadPreviewUrl}
            setBadPreviewUrl={setBadPreviewUrl}
            displayErrors={displayErrors}
          />
        );
      case "addSubtitle":
        return (
          <AddSubtitles
            setCurrentTab={setCurrentTab}
            NoSubtitles={NoSubtitles}
            setNoSubtitles={setNoSubtitles}
            MissingVideos={MissingVideos}
            setMissingVideos={setMissingVideos}
            ExcersisesMissingQuestions={ExcersisesMissingQuestions}
            setExcersisesMissingQuestions={setExcersisesMissingQuestions}
            displayErrors={displayErrors}
          />
        );
      case "addExam":
        return (
          <AddExam
            setCurrentTab={setCurrentTab}
            MissingExamTitle={MissingExamTitle}
            setMissingExamTitle={setMissingExamTitle}
            handleCreateCourse={handleCreateCourse}
            handleEditCourse={handleEditCourse}
            displayErrors={displayErrors}
          />
        );
      default:
    }
  };

  return (
    <Form className="d-flex flex-column">
      <Col className="d-flex justify-content-center">
        <h1 className="fw-bold fs-2">Create Course</h1>
      </Col>

      <Col className="d-flex justify-content-center">
        <Breadcrumb>
          <Breadcrumb.Item
            className="fw-semibold"
            active={CurrentTab === "addInfo" ? true : false}
            onClick={() => setCurrentTab("addInfo")}
          >
            Info {InfoHasErrors && <MdOutlineError color="red" />}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="fw-semibold"
            active={CurrentTab === "addSubtitle" ? true : false}
            onClick={() => setCurrentTab("addSubtitle")}
          >
            Subtitles
            {SubtitleHasErrors && <MdOutlineError color="red" />}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="fw-semibold"
            active={CurrentTab === "addExam" ? true : false}
            onClick={() => setCurrentTab("addExam")}
          >
            Exam {ExamHasErrors && <MdOutlineError color="red" />}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>

      {displayView()}
    </Form>
  );
}
