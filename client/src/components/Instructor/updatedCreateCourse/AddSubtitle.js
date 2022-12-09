import { useState } from "react";
import { Col, Button } from "react-bootstrap";

import SubtitleForm from "./SubtitleForm";
import ViewSubtitles from "./ViewSubtitles";
import AddVideo from "../updatedCreateCourse/AddVideo";
import AddExercise from "../updatedCreateCourse/AddExercise";

export default function AddSubtitle(props) {
	const [CurrentComponent, setCurrentComponent] = useState("viewSubtitles");

	const displayComponent = () => {
		switch (CurrentComponent) {
			case "viewSubtitles":
				return (
					<>
						<ViewSubtitles />
						<Col className="nextButton">
							<Button
								className="me-3"
								onClick={() => {
									props.setCurrentTab("addExam");
								}}>
								Go Back
							</Button>
							<Button className="me-3" onClick={() => setCurrentComponent("addSubtitle")}>
								Add a Subtitle
							</Button>
							<Button onClick={props.handleCreateCourse}>Create Course</Button>
						</Col>
					</>
				);

			case "addSubtitle":
				return <SubtitleForm setCurrentComponent={setCurrentComponent} />;
			case "addExercise":
				return <AddExercise setCurrentComponent={setCurrentComponent} />;
			case "addVideo":
				return <AddVideo setCurrentComponent={setCurrentComponent} />;
			default:
		}
	};

	return <>{displayComponent()}</>;
}
