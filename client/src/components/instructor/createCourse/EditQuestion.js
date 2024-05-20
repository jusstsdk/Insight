import { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Popover,
  OverlayTrigger,
  Modal,
} from "react-bootstrap";

export default function EditQuestion(props) {
  const [Question, setQuestion] = useState(props.question.question);
  const [FirstChoice, setFirstChoice] = useState(props.question.choices[0]);
  const [SecondChoice, setSecondChoice] = useState(props.question.choices[1]);
  const [ThirdChoice, setThirdChoice] = useState(props.question.choices[2]);
  const [FourthChoice, setFourthChoice] = useState(props.question.choices[3]);
  const [Choices, setChoices] = useState(props.question.choices);
  const [CorrectAnswer, setCorrectAnswer] = useState(
    props.question.correctAnswer,
  );

  const [MissingCorrectAnswer, setMissingCorrectAnswer] = useState(false);

  useEffect(() => {
    setChoices([FirstChoice, SecondChoice, ThirdChoice, FourthChoice]);
  }, [FirstChoice, SecondChoice, ThirdChoice, FourthChoice]);

  const handleEditQuestion = () => {
    // Checks if the choosen answer is valid
    if (
      (CorrectAnswer !== FirstChoice) &
      (CorrectAnswer !== SecondChoice) &
      (CorrectAnswer !== ThirdChoice) &
      (CorrectAnswer !== FourthChoice) &
      (CorrectAnswer !== "default")
    ) {
      setMissingCorrectAnswer(true);
      setCorrectAnswer("default");
      return;
    }
    // Checks if the user didn't choose a Correct Answer
    if (CorrectAnswer === "default") {
      setMissingCorrectAnswer(true);
      return;
    } else setMissingCorrectAnswer(false);

    // The Question that would be added
    let newQuestion = {
      question: Question,
      choices: Choices,
      correctAnswer: CorrectAnswer,
    };

    // Clearing the form
    setQuestion("");
    setFirstChoice("");
    setSecondChoice("");
    setThirdChoice("");
    setFourthChoice("");
    setChoices(["", "", "", ""]);
    setCorrectAnswer("default");

    // Updating the Redux
    props.handleEditQuestion(props.question_key, newQuestion);
  };

  // A Popover that ensures that the user chose a Correct Answer
  const popover = (
    <Popover id="popover-basic" className="align-items-center">
      <Popover.Header as="h3">Can't add question!</Popover.Header>
      <Popover.Body className="error">
        Please choose a correct answer
      </Popover.Body>
    </Popover>
  );
  return (
    <Modal
      show={props.show}
      onHide={() => {
        setCorrectAnswer("default");
        props.handleClose();
      }}
      backdrop="static"
      keyboard={false}
      size="xl"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Добавление вопроса
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Question Title */}
        <Form.Group
          as={Row}
          className="my-3 d-flex align-items-center justify-content-start"
        >
          <Form.Label column sm={2}>
            Вопрос
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="text"
              placeholder="Вопрос"
              value={Question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        {/* Choices Inputs */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Choices</InputGroup.Text>
          <Form.Control
            placeholder="First Answer"
            aria-label="First Answer"
            value={FirstChoice}
            onChange={(e) => setFirstChoice(e.target.value)}
          />
          <Form.Control
            placeholder="Second Answer"
            aria-label="Second Answer"
            value={SecondChoice}
            onChange={(e) => setSecondChoice(e.target.value)}
          />
          <Form.Control
            placeholder="Third Answer"
            aria-label="Third Answer"
            value={ThirdChoice}
            onChange={(e) => setThirdChoice(e.target.value)}
          />
          <Form.Control
            placeholder="Fourth Answer"
            aria-label="Fourth Answer"
            value={FourthChoice}
            onChange={(e) => setFourthChoice(e.target.value)}
          />
        </InputGroup>

        {/* Correct Answer DropDown Menu */}
        <Form.Group
          as={Row}
          className="mb-3 d-flex align-items-center justify-content-start"
        >
          <Form.Label column sm={2}>
            Correct Answer
          </Form.Label>
          <Col sm={7}>
            <Form.Select
              value={CorrectAnswer}
              aria-label="Default select example"
              onChange={(e) => {
                setCorrectAnswer(e.target.value);
                setMissingCorrectAnswer(false);
              }}
            >
              <option value="default">Choose the correct answer</option>
              <option value={Choices[0]}>{Choices[0]}</option>
              <option value={Choices[1]}>{Choices[1]}</option>
              <option value={Choices[2]}>{Choices[2]}</option>
              <option value={Choices[3]}>{Choices[3]}</option>
            </Form.Select>
          </Col>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        {/* Close and Edit Question buttons */}
        <Button
          variant="secondary"
          onClick={() => {
            setCorrectAnswer("default");
            props.handleClose();
          }}
        >
          Close
        </Button>
        <OverlayTrigger
          trigger="click"
          placement="right"
          rootClose
          show={MissingCorrectAnswer}
          overlay={MissingCorrectAnswer ? popover : <></>}
        >
          <Button id="addSubject" onClick={handleEditQuestion}>
            Edit Question
          </Button>
        </OverlayTrigger>
      </Modal.Footer>
    </Modal>
  );
}
