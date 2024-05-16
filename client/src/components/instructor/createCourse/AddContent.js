import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { MdOutlineError } from "react-icons/md";
import { addContentToSubtitle } from "../../../redux/createCourseSlice";
import { useDispatch } from "react-redux";

const AddContent = (props) => {
  const dispatch = useDispatch();

  const [contentType, setContentType] = useState(null);

  const [contentText, setContentText] = useState("");
  const [missingText, setMissingText] = useState(false);

  const [contentImage, setContentImage] = useState("");
  const [missingImage, setMissingImage] = useState(false);
  const [contentAlt, setContentAlt] = useState("");
  const [missingAlt, setMissingAlt] = useState(false);

  const [content, setContent] = useState([]);

  const handleAddContent = () => {};

  const handleAddImage = () => {
    if (contentImage === "") {
      setMissingImage(true);
    } else {
      setMissingImage(false);
    }

    if (contentAlt === "") {
      setMissingAlt(true);
    } else {
      setMissingAlt(false);
    }

    if (contentImage === "" || contentAlt === "") return;

    const result = content.concat({
      imageAlt: contentAlt,
      imageUrl: "contentImage",
    });

    setContent(result);

    setContentType(null);
    setContentAlt("");
    setContentImage("");
  };

  const handleAddText = () => {
    if (contentText === "") {
      setMissingText(true);
      return;
    } else {
      setMissingText(false);
    }

    const result = content.concat({ text: contentText });

    dispatch(addContentToSubtitle({ subtitleKey: props.subtitleKey, content }));

    setContent(result);

    setContentType(null);
    setContentText("");
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
      size="xl"
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {props.case === "Add" ? "Adding" : "Editting"} a Content
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {content.length > 0 &&
          !contentType &&
          content.map((item) => (
            <div>
              {item.text && <p>{item.text}</p>}
              {item.imageUrl && <img src={item.imageUrl} alt={item.imageAlt} />}
            </div>
          ))}

        {!contentType && (
          <Row className={"justify-content-center"}>
            <Col
              sm={"auto"}
              className={"flex-grow-0 flex-shrink-0 flex-basis-auto w-auto"}
            >
              <Button onClick={() => setContentType("text")}>Add Text</Button>
            </Col>
            <Col
              sm={"auto"}
              className={"flex-grow-0 flex-shrink-0 flex-basis-auto w-auto"}
            >
              <Button onClick={() => setContentType("image")}>Add Image</Button>
            </Col>
          </Row>
        )}

        {contentType === "text" && (
          <Form.Group as={Row} className="mb-3 d-flex justify-content-start">
            <Form.Label column sm={2}>
              Content text
              <br />
              <span>
                {missingText && (
                  <span className="error">
                    Missing
                    <MdOutlineError />
                  </span>
                )}
              </span>
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as={"textarea"}
                rows={5}
                type="text"
                placeholder="Content text"
                value={contentText}
                onChange={(e) => {
                  setContentText(e.target.value);
                }}
              />

              <Row className={"justify-content-end mt-3"}>
                <Col
                  sm={"auto"}
                  className={"flex-grow-0 flex-shrink-0 flex-basis-auto w-25"}
                >
                  <Button
                    variant="secondary"
                    className={"w-100"}
                    onClick={() => setContentType(null)}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col
                  sm={"auto"}
                  className={"flex-grow-0 flex-shrink-0 flex-basis-auto w-25"}
                >
                  <Button className={"w-100"} onClick={handleAddText}>
                    Add
                  </Button>
                </Col>
              </Row>
            </Col>
          </Form.Group>
        )}

        {contentType === "image" && (
          <>
            <Form.Group as={Row} className="mb-3 d-flex justify-content-start">
              <Form.Label column sm={2}>
                Choose an image
                <br />
                <span>
                  {missingImage && (
                    <span className="error">
                      Missing
                      <MdOutlineError />
                    </span>
                  )}
                </span>
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type="file"
                  onChange={(e) => setContentImage(e.target.files[0])}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 d-flex justify-content-start">
              <Form.Label column sm={2}>
                Alt for image
                <br />
                <span>
                  {missingAlt && (
                    <span className="error">
                      Missing
                      <MdOutlineError />
                    </span>
                  )}
                </span>
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  placeholder="Alt for image"
                  value={contentAlt}
                  onChange={(e) => {
                    setContentAlt(e.target.value);
                  }}
                />

                <Row className={"justify-content-end mt-3"}>
                  <Col
                    sm={"auto"}
                    className={"flex-grow-0 flex-shrink-0 flex-basis-auto w-25"}
                  >
                    <Button
                      variant="secondary"
                      className={"w-100"}
                      onClick={() => setContentType(null)}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col
                    sm={"auto"}
                    className={"flex-grow-0 flex-shrink-0 flex-basis-auto w-25"}
                  >
                    <Button className={"w-100"} onClick={handleAddImage}>
                      Add
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button id="addSubject" onClick={handleAddContent}>
          {props.case} Exercise
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContent;
