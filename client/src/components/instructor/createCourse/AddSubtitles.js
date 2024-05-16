import { useState } from "react";
import { Col, Button, Row } from "react-bootstrap";

import ViewSubtitles from "./ViewSubtitles";
import AddSubtitleInfo from "./AddSubtitleInfo";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineError } from "react-icons/md";

export default function AddSubtitle(props) {
  const [AddSubtitleModalShow, setAddSubtitleModalShow] = useState(false);
  const dispatch = useDispatch();
  const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);

  const handleNext = () => {
    if (Subtitles.length === 0) {
      props.setNoSubtitles(true);
      // setMissingExcersises(false);
      props.setMissingVideos(false);
      props.setExcersisesMissingQuestions(false);
      // showErrorMessage();
    } else {
      props.setNoSubtitles(false);
      let MissingVideosTemp = false;
      let MissingQuestionsTemp = false;
      if (Subtitles.some((subtitle) => subtitle.videos.length === 0)) {
        props.setMissingVideos(true);
        MissingVideosTemp = true;
      }
      if (
        Subtitles.some((subtitle) =>
          subtitle.exercises.some(
            (exercise) => exercise.questions.length === 0,
          ),
        )
      ) {
        props.setExcersisesMissingQuestions(true);
        // setMissingExcersises(false);
        MissingQuestionsTemp = true;
      }
      if (!(MissingQuestionsTemp || MissingVideosTemp)) {
        props.setNoSubtitles(false);
        props.setMissingVideos(false);
        // setMissingExcersises(false);
        props.setExcersisesMissingQuestions(false);
      }
    }
    props.setCurrentTab("addExam");
  };

  return (
    <>
      <Row>
        <Col>
          <h1 className="fs-3 fw-semibold text-muted">
            Adding Course Subtitles
          </h1>
        </Col>
        <Col className="d-flex justify-content-end">
          {props.displayErrors && props.NoSubtitles && (
            <h6 className="error">
              You need add at least one subtitle <MdOutlineError />
            </h6>
          )}
          {props.displayErrors && props.MissingVideos && (
            <h6 className="error">
              each subtitle must have at least one video or exercise or content
              <MdOutlineError />
            </h6>
          )}
          {props.displayErrors && props.ExcersisesMissingQuestions && (
            <h6 className="error">
              each exercise must have at least one question <MdOutlineError />
            </h6>
          )}
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => setAddSubtitleModalShow(true)}>
            Add a Subtitle
          </Button>
        </Col>
      </Row>
      <ViewSubtitles />

      {/* Navigation */}
      <Col className="mb-3 me-3 fixed-bottom d-flex justify-content-center">
        <Button
          className="me-3"
          onClick={() => {
            props.setCurrentTab("addInfo");
          }}
        >
          <AiOutlineArrowLeft /> Add info
        </Button>

        <Button
          onClick={() => {
            handleNext();
          }}
        >
          <AiOutlineArrowRight /> Add exam
        </Button>
      </Col>
      {AddSubtitleModalShow && (
        <AddSubtitleInfo
          case="Add"
          show={AddSubtitleModalShow}
          handleClose={() => setAddSubtitleModalShow(false)}
        />
      )}
    </>
  );
}
