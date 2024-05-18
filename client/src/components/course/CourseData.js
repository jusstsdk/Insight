import { Card, Col, Row } from "react-bootstrap";
import YouTube from "react-youtube";
import CourseInstructorsList from "./CourseInstructorsList";
function CourseData({ course, instructors }) {
  const getYouTubeVideoIdFromUrl = (url) => {
    // Our regex pattern to look for a youTube ID
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    //Match the url with the regex
    const match = url.match(regExp);
    //Return the result
    return match && match[2].length === 11 ? match[2] : undefined;
  };
  let videoId = getYouTubeVideoIdFromUrl(course.previewVideo);
  console.log(videoId);

  return (
    <Row>
      {/* Summary */}
      <Col>
        <h5 className="fst-italic">Резюме</h5>
        <p className="lead">{course.summary}</p>
      </Col>
      {/* Preview Video */}
      <Col className="px-0 ">
        <h5 className="fst-italic">Стартовое видео</h5>
        {videoId && (
          <Card className="video-responsive mb-3">
            <YouTube videoId={videoId} />
          </Card>
        )}
        {!videoId && <p>Видео нет</p>}
        <CourseInstructorsList
          instructors={instructors}
        ></CourseInstructorsList>
      </Col>
    </Row>
  );
}

export default CourseData;
