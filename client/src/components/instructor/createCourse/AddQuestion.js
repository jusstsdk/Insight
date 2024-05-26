import { useState, useEffect, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Popover,
  OverlayTrigger,
  Modal,
  FormLabel,
} from "react-bootstrap";
import { MdOutlineError } from "react-icons/md";

export default function AddQuestion(props) {
  const [Question, setQuestion] = useState(
    props.case === "Add" ? "" : props.question.question,
  );
  const [FirstChoice, setFirstChoice] = useState(
    props.case === "Add" ? "" : props.question.choices[0],
  );
  const [SecondChoice, setSecondChoice] = useState(
    props.case === "Add" ? "" : props.question.choices[1],
  );
  const [ThirdChoice, setThirdChoice] = useState(
    props.case === "Add" ? "" : props.question.choices[2],
  );
  const [FourthChoice, setFourthChoice] = useState(
    props.case === "Add" ? "" : props.question.choices[3],
  );
  const [Choices, setChoices] = useState(
    props.case === "Add" ? ["", "", "", ""] : props.question.choices,
  );
  const [CorrectAnswer, setCorrectAnswer] = useState(
    props.case === "Add" ? "default" : props.question.correctAnswer,
  );
  const [MissingTitle, setMissingTitle] = useState(false);
  const [MissingFirstChoice, setMissingFirstChoice] = useState(false);
  const [MissingSecondChoice, setMissingSecondChoice] = useState(false);
  const [MissingThirdChoice, setMissingThirdChoice] = useState(false);
  const [MissingFourthChoice, setMissingFourthChoice] = useState(false);
  const [MissingCorrectAnswer, setMissingCorrectAnswer] = useState(false);
  const [doubleAnswer, setDoubleAnswer] = useState(false);

  const handleAddQuestion = (e) => {
    if (Question === "") {
      setMissingTitle(true);
    } else setMissingTitle(false);
    if (FirstChoice === "") {
      setMissingFirstChoice(true);
    } else setMissingFirstChoice(false);
    if (SecondChoice === "") {
      setMissingSecondChoice(true);
    } else setMissingSecondChoice(false);
    if (ThirdChoice === "") {
      setMissingThirdChoice(true);
    } else setMissingThirdChoice(false);
    if (FourthChoice === "") {
      setMissingFourthChoice(true);
    } else setMissingFourthChoice(false);
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
    if (CorrectAnswer === "default") {
      setMissingCorrectAnswer(true);
      return;
    } else setMissingCorrectAnswer(false);
    if (
      Question === "" ||
      FirstChoice === "" ||
      SecondChoice === "" ||
      ThirdChoice === "" ||
      FourthChoice === "" ||
      CorrectAnswer === "default"
    )
      return;

    if (
      FirstChoice === SecondChoice ||
      FirstChoice === ThirdChoice ||
      FirstChoice === FourthChoice ||
      SecondChoice === ThirdChoice ||
      SecondChoice === FourthChoice ||
      ThirdChoice === FourthChoice
    ) {
      setDoubleAnswer(true);
      return;
    } else {
      setDoubleAnswer(false);
    }

    let newQuestion = {
      question: Question,
      choices: Choices,
      correctAnswer: CorrectAnswer,
    };

    setQuestion("");
    setFirstChoice("");
    setSecondChoice("");
    setThirdChoice("");
    setFourthChoice("");
    setChoices(["", "", "", ""]);
    setCorrectAnswer("default");
    if (props.case === "Add") props.handleAddQuestion(newQuestion);
    else {
      props.handleAddQuestion(props.question_key, newQuestion);
    }
    props.handleClose();
  };
  const popover = (
    <Popover id="popover-basic" className="align-items-center">
      <Popover.Header as="h3">Can't add question!!!</Popover.Header>
      <Popover.Body className="error">
        Please choose a correct answer
      </Popover.Body>
    </Popover>
  );
  const QuestionRef = useRef();
  const FirstChoiceRef = useRef();
  const SecondChoiceRef = useRef();
  const ThirdChoiceRef = useRef();
  const FourthChoiceRef = useRef();

  const resizeTextArea = (textAreaRef) => {
    try {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    resizeTextArea(QuestionRef);
    resizeTextArea(FirstChoiceRef);
    resizeTextArea(SecondChoiceRef);
    resizeTextArea(ThirdChoiceRef);
    resizeTextArea(FourthChoiceRef);
  }, [Question, FirstChoice, SecondChoice, ThirdChoice, FourthChoice]);
  useEffect(() => {
    setChoices([FirstChoice, SecondChoice, ThirdChoice, FourthChoice]);
  }, [FirstChoice, SecondChoice, ThirdChoice, FourthChoice]);
  return (
    <>
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
            {props.case === "Add" ? "Добавление" : "Редактирование"} вопроса
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group
            as={Row}
            className="mb-3 d-flex align-items-center justify-content-start"
          >
            <Form.Label column sm={2}>
              Вопрос{" "}
              {MissingTitle && (
                <span className="error">
                  пропущено
                  <MdOutlineError />
                </span>
              )}
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                ref={QuestionRef}
                type="text"
                placeholder="Вопрос"
                value={Question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Col className="mb-3">
            <Row className="mb-2 d-flex align-items-center">
              <Col sm={2}>
                <FormLabel>
                  Выбор 1{" "}
                  {MissingFirstChoice && (
                    <span className="error">
                      пропущено
                      <MdOutlineError />
                    </span>
                  )}
                </FormLabel>
              </Col>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  ref={FirstChoiceRef}
                  placeholder="Первый ответ"
                  aria-label="First Answer"
                  value={FirstChoice}
                  onChange={(e) => setFirstChoice(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-2 d-flex align-items-center">
              <Col sm={2}>
                <FormLabel>
                  Выбор 2{" "}
                  {MissingSecondChoice && (
                    <span className="error">
                      пропущено
                      <MdOutlineError />
                    </span>
                  )}
                </FormLabel>
              </Col>
              <Col sm={9}>
                <Form.Control
                  ref={SecondChoiceRef}
                  as="textarea"
                  placeholder="Второй ответ"
                  aria-label="Second Answer"
                  value={SecondChoice}
                  onChange={(e) => setSecondChoice(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-2 d-flex align-items-center">
              <Col sm={2}>
                <FormLabel>
                  Выбор 3{" "}
                  {MissingThirdChoice && (
                    <span className="error">
                      пропущено
                      <MdOutlineError />
                    </span>
                  )}
                </FormLabel>
              </Col>
              <Col sm={9}>
                <Form.Control
                  ref={ThirdChoiceRef}
                  as="textarea"
                  placeholder="Третий ответ"
                  aria-label="Third Answer"
                  value={ThirdChoice}
                  onChange={(e) => setThirdChoice(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-2 d-flex align-items-center">
              <Col sm={2}>
                <FormLabel>
                  Выбор 4{" "}
                  {MissingFourthChoice && (
                    <span className="error">
                      пропущено
                      <MdOutlineError />
                    </span>
                  )}
                </FormLabel>
              </Col>
              <Col sm={9}>
                <Form.Control
                  ref={FourthChoiceRef}
                  as="textarea"
                  placeholder="Четвертый ответ"
                  aria-label="Fourth Answer"
                  value={FourthChoice}
                  onChange={(e) => setFourthChoice(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Form.Group
            as={Row}
            className="mb-3 d-flex align-items-center justify-content-start"
          >
            <Form.Label column sm={2}>
              Правильный ответ
            </Form.Label>
            <Col sm={3}>
              <Form.Select
                value={CorrectAnswer}
                aria-label="Default select example"
                onChange={(e) => {
                  setCorrectAnswer(e.target.value);
                  setMissingCorrectAnswer(false);
                }}
              >
                <option value="default">Выберите правильный ответ</option>
                <option value={Choices[0]}>Выбор 1</option>
                <option value={Choices[1]}>Выбор 2</option>
                <option value={Choices[2]}>Выбор 3</option>
                <option value={Choices[3]}>Выбор 4</option>
              </Form.Select>
            </Col>
            <Col sm={3}>
              {MissingCorrectAnswer && (
                <span className="error">
                  отсутствует правильный вариант
                  <MdOutlineError />
                </span>
              )}
              {doubleAnswer && (
                <span className="error">
                  варианты ответа не могут быть одинаковыми
                  <MdOutlineError />
                </span>
              )}
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setCorrectAnswer("default");
              props.handleClose();
            }}
          >
            Закрыть
          </Button>
          <OverlayTrigger
            trigger="click"
            placement="right"
            rootClose
            show={MissingCorrectAnswer}
            overlay={MissingCorrectAnswer ? popover : <></>}
          >
            <Button id="addSubject" onClick={handleAddQuestion}>
              {props.case} Question
            </Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}
