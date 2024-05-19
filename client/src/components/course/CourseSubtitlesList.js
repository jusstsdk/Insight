import { Button, ListGroup, Table, Row, Col, Modal } from "react-bootstrap";
import { MdTimer } from "react-icons/md";
import React, { useState } from "react";
function CourseSubtitlesList({ course }) {
  const [show, setShow] = useState(false);
  const [SubtitleTitle, setSubtitleTitle] = useState("");
  const [Exercises, setExercises] = useState([]);

  const handleClose = () => {
    setSubtitleTitle("");
    setExercises([]);
    setShow(false);
  };
  const handleShow = (title, exercises) => {
    setSubtitleTitle(title);
    setExercises(exercises);
    setShow(true);
  };

  return (
    <>
      <h3 className="fst-italic">Subtitles</h3>
      <Col>
        <ListGroup variant="flush">
          {course.subtitles.map((subtitle, subtitle_index) => {
            return (
              <ListGroup.Item
                className="ps-0 align-items-center"
                key={`Subtitles_tr_${course._id}_${subtitle_index}`}
              >
                <Row>
                  <Col sm={1}>#{subtitle_index + 1}</Col>
                  <Col sm={7}>
                    {subtitle.title ? subtitle.title : "No Title."}
                  </Col>
                  <Col sm={2} className="d-flex align-items-center">
                    <MdTimer className="me-1" />
                    <p className="fitWidth lead mb-0">
                      {Math.ceil(subtitle.seconds / 60)} Minutes
                    </p>
                  </Col>
                  <Col sm={2} className="d-flex justify-content-end">
                    {subtitle.exercises.length !== 0 ? (
                      <Button
                        className="fitWidth"
                        onClick={() =>
                          handleShow(subtitle.title, subtitle.exercises)
                        }
                      >
                        View Exercises
                      </Button>
                    ) : (
                      <h6 className="text-muted">Нет упражнений</h6>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subtitle: {SubtitleTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {Exercises.map((exercise, exercise_index) => {
              return (
                <ListGroup.Item
                  className="ps-0"
                  key={`Subtitles_tr_${course._id}_${exercise_index}`}
                >
                  {exercise_index + 1}. {exercise.title}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseSubtitlesList;
