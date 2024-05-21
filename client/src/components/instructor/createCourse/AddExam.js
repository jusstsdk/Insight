import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Form, Row, Col, Button, Accordion } from "react-bootstrap";
import { MdOutlineError } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  setExamTitle,
  addToExamQuestions,
  editExamQuestion,
  removeExamQuestions,
} from "../../../redux/createCourseSlice";

import ViewExercise from "../createCourse/ViewExercise";
import AddQuestion from "../createCourse/AddQuestion";

export default function AddExam(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const status = location.state.status;

  const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
  const ExamQuestions = useSelector(
    (state) => state.createCourseReducer.examQuestions,
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);
  const handleAddQuestion = (question) => {
    dispatch(addToExamQuestions(question));
    handleAddModalClose();
  };
  const handleButtons = (action) => {
    if (ExamTitle === "") {
      props.setMissingExamTitle(true);
    } else {
      props.setMissingExamTitle(false);
    }
    if (action === "save") {
      if (status === "New") props.handleCreateCourse("Draft");
      else props.handleEditCourse("Draft");
    } else {
      if (status === "New") props.handleCreateCourse("Review");
      else props.handleEditCourse("Published");
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1 className="fs-3 fw-semibold text-muted">Добавить экзамен</h1>
        </Col>
        <Col className="d-flex justify-content-end fitWidth">
          <Button onClick={handleAddModalShow}>Добавить вопрос</Button>
        </Col>
      </Row>

      <Form.Group
        as={Row}
        className="mb-3 d-flex align-items-center justify-content-start"
      >
        <Form.Label column sm={2}>
          Название экзамена
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            type="text"
            placeholder="Введите название"
            onChange={(e) => {
              dispatch(setExamTitle(e.target.value));
            }}
            value={ExamTitle}
          />
        </Col>
      </Form.Group>

      <Accordion>
        <ViewExercise
          case="Exam"
          key="view_exam_questions"
          Questions={ExamQuestions}
          handleAddQuestion={(key, newQuestion) =>
            dispatch(
              editExamQuestion({
                key: key,
                question: newQuestion,
              }),
            )
          }
          handleDeleteQuestion={(key) => dispatch(removeExamQuestions(key))}
        />
      </Accordion>
      {/* Navigation and Actions */}
      <Col className="mb-3 me-3 fixed-bottom d-flex justify-content-center">
        {/* Go back to Subtitles */}
        <Button
          className="me-3"
          onClick={() => {
            props.setCurrentTab("addSubtitle");
          }}
        >
          <AiOutlineArrowLeft /> Добавить урок
        </Button>
        {/* Save Course */}
        <Button
          className="me-3"
          onClick={() => {
            handleButtons("save");
          }}
        >
          Сохранить курс
        </Button>
        {/* Publish Course */}
        <Button
          onClick={() => {
            handleButtons("publish");
          }}
        >
          Опубликовать курс
        </Button>
      </Col>
      <AddQuestion
        case="Add"
        handleAddQuestion={handleAddQuestion}
        show={showAddModal}
        handleClose={handleAddModalClose}
      />
    </>
  );
}
