import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Button, Accordion } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import BookIcon from "@mui/icons-material/Book";
import { removeSubtitle } from "../../../redux/createCourseSlice";

import AddSubtitleInfo from "./AddSubtitleInfo";
import ViewBoth from "./ViewBoth";
export default function ViewSubtitles() {
  const dispatch = useDispatch();

  const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);

  const [Subtitlekey, setSubtitlekey] = useState(-1);
  const [Subtitle, setSubtitle] = useState({});

  const [ShowEditSubtitleModal, setShowEditSubtitleModal] = useState(false);
  const handleEditSubtitleModalClose = () => setShowEditSubtitleModal(false);
  const handleEditSubtitleModalShow = (subtitle, subtitle_key) => {
    setSubtitle(subtitle);
    setSubtitlekey(subtitle_key);
    setShowEditSubtitleModal(true);
  };

  return (
    <>
      <Accordion variant="light" className="mt-2">
        {Subtitles.map((subtitle, subtitle_key) => {
          return (
            <Accordion.Item
              eventKey={`subtitle_${subtitle_key}`}
              key={`subtitle_${subtitle_key}`}
            >
              <div className="d-flex">
                <Col sm={11} className="me-auto">
                  <Accordion.Header className="accordionHeaderWidth">
                    <BookIcon
                      key={`subtitle_${subtitle._id}_bookIcon_${subtitle_key}`}
                    />
                    <h6 className="me-3 mb-0">Название: {subtitle.title}</h6>
                  </Accordion.Header>
                </Col>
                <Col sm={1} className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="accordionTrash accordionLikeEditButton"
                    key={`subtitle_edit_button_${subtitle_key}`}
                    onClick={() =>
                      handleEditSubtitleModalShow(subtitle, subtitle_key)
                    }
                  >
                    <AiOutlineEdit key={"subtitle_edit_" + subtitle_key} />
                  </Button>
                  <Button
                    className="accordionTrash accordionLikeDeleteButton"
                    variant="danger"
                    key={`subtitle_trash_button_${subtitle_key}`}
                    onClick={() => dispatch(removeSubtitle(subtitle_key))}
                  >
                    <BsTrash key={"subtitle_trash_" + subtitle_key} />
                  </Button>
                </Col>
              </div>
              <Accordion.Body>
                <Accordion>
                  <ViewBoth
                    key={`subtitle_${subtitle_key}`}
                    subtitle={subtitle}
                    subtitleKey={subtitle_key}
                    setSubtitle={setSubtitle}
                    setSubtitlekey={setSubtitlekey}
                    SubtitleExercises={subtitle.exercises}
                    SubtitleVideos={subtitle.videos}
                    SubtitleContent={subtitle.content}
                  />
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>

      {ShowEditSubtitleModal && (
        <AddSubtitleInfo
          case="Edit"
          subtitle={Subtitle}
          subtitleKey={Subtitlekey}
          show={ShowEditSubtitleModal}
          handleClose={handleEditSubtitleModalClose}
        />
      )}
    </>
  );
}
