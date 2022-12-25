import YoutubeEmbed from "../YoutubeEmbed";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import API from "../../functions/api";
import { addNoteToVideoNotes, deleteNoteFromVideoNotes, watchVideo } from "../../redux/userSlice";
import { BsTrash } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { setContent } from "../../redux/continueCourseSlice";
export default function WatchVideo(props) {
	// Data Setup
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const NoteRef = useRef();
	const [Note, setNote] = useState("");

	// Gets Course Index in the User's Courses.
	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);

	const videoIndex = user.courses[courseIndex].subtitles[SubtitleIndex].videos.findIndex(
		(video) => video._id === Content._id
	);

	const handleMarkAsWatched = async () => {
		await API.put(`/trainees/${user._id}/watchVideo`, {
			courseIndex: courseIndex,
			subtitleIndex: SubtitleIndex,
			videoIndex: videoIndex,
		});
		dispatch(
			watchVideo({
				courseIndex: courseIndex,
				subtitleIndex: SubtitleIndex,
				videoIndex: videoIndex,
			})
		);
		dispatch(setContent({ ...Content, isWatched: true }));
	};

	const handleAddNote = async () => {
		let note = NoteRef.current.value;
		await API.put(`/trainees/${user._id}/addNoteToVideoNotes`, {
			courseIndex: courseIndex,
			subtitleIndex: SubtitleIndex,
			videoIndex: videoIndex,
			note: note,
		});
		dispatch(
			addNoteToVideoNotes({
				courseIndex: courseIndex,
				subtitleIndex: SubtitleIndex,
				videoIndex: videoIndex,
				note: note,
			})
		);
		dispatch(setContent({ ...Content, notes: [...Content.notes, note] }));

		setNote("");
	};

	const handleDeleteNote = async (note_index) => {
		await API.put(`/trainees/${user._id}/deleteNoteFromVideoNotes`, {
			courseIndex: courseIndex,
			subtitleIndex: SubtitleIndex,
			videoIndex: videoIndex,
			noteIndex: note_index,
		});
		dispatch(
			deleteNoteFromVideoNotes({
				courseIndex: courseIndex,
				subtitleIndex: SubtitleIndex,
				videoIndex: videoIndex,
				noteIndex: note_index,
			})
		);
		let newNotes = Content.notes.filter((_, i) => i !== note_index);
		dispatch(setContent({ ...Content, notes: newNotes }));
	};
	const resizeTextArea = () => {
		try {
			NoteRef.current.style.height = "auto";
			NoteRef.current.style.height = NoteRef.current.scrollHeight + "px";
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		resizeTextArea();
	}, [Note]);
	return (
		<>
			<Col>
				<h5>{Content.title}</h5>
				<h6>{Content.description}</h6>
				<YoutubeEmbed src={Content.url} />
				<Row className="me-auto mt-2 justify-content-end">
					{!Content.isWatched && (
						<Button className="ms-3 w-auto" onClick={handleMarkAsWatched}>
							Mark as Watched
						</Button>
					)}
				</Row>
			</Col>
			<Col>
				<ListGroup className="px-3">
					{Content.notes.map((note, note_index) => (
						<>
							<ListGroup.Item
								key={`subtitle_${Content._id}_note_${note_index}_container`}
								variant="dark">
								<Row className="justify-content-between">
									<Col sm={11}>
										<p>{note}</p>
									</Col>
									<Col sm={1}>
										<Button
											className=" w-auto"
											variant="danger"
											key={`video_${Content._id}_notes_trash_button_${note_index}`}
											onClick={() => handleDeleteNote(note_index)}>
											<BsTrash key={`video_${Content._id}_notes_trash_${note_index}`} />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						</>
					))}
				</ListGroup>
				<Form.Control
					className="my-2"
					as="textarea"
					value={Note}
					onChange={(e) => {
						setNote(e.target.value);
					}}
					ref={NoteRef}
					placeholder="Write a note"
					rows={4}
				/>
				<Row className="me-auto  justify-content-end">
					<Button className="w-auto" onClick={handleAddNote}>
						Add Note
					</Button>
				</Row>
			</Col>
		</>
	);
}
