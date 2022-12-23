import YoutubeEmbed from "../YoutubeEmbed";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import API from "../../functions/api";
import { addNoteToVideoNotes, deleteNoteFromVideoNotes, watchVideo } from "../../redux/userSlice";
import { BsTrash } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
export default function WatchVideo(props) {
	// Data Setup
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);

	const NoteRef = useRef();
	const [Note, setNote] = useState("");

	// Gets Course Index in the User's Courses.
	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);

	const videoIndex = user.courses[courseIndex].subtitles[props.subtitleIndex].videos.findIndex(
		(video) => video._id === props.Content._id
	);

	const handleMarkAsWatched = async () => {
		await API.put(`/trainees/${user._id}/watchVideo`, {
			courseIndex: courseIndex,
			subtitleIndex: props.subtitleIndex,
			videoIndex: videoIndex,
		});
		dispatch(
			watchVideo({
				courseIndex: courseIndex,
				subtitleIndex: props.subtitleIndex,
				videoIndex: videoIndex,
			})
		);
		props.setContent({ ...props.Content, isWatched: true });
	};

	const handleAddNote = async () => {
		let note = NoteRef.current.value;
		await API.put(`/trainees/${user._id}/addNoteToVideoNotes`, {
			courseIndex: courseIndex,
			subtitleIndex: props.subtitleIndex,
			videoIndex: videoIndex,
			note: note,
		});
		dispatch(
			addNoteToVideoNotes({
				courseIndex: courseIndex,
				subtitleIndex: props.subtitleIndex,
				videoIndex: videoIndex,
				note: note,
			})
		);
		props.setContent({ ...props.Content, notes: [...props.Content.notes, note] });

		setNote("");
	};

	const handleDeleteNote = async (note_index) => {
		await API.put(`/trainees/${user._id}/deleteNoteFromVideoNotes`, {
			courseIndex: courseIndex,
			subtitleIndex: props.subtitleIndex,
			videoIndex: videoIndex,
			noteIndex: note_index,
		});

		dispatch(
			deleteNoteFromVideoNotes({
				courseIndex: courseIndex,
				subtitleIndex: props.subtitleIndex,
				videoIndex: videoIndex,
				noteIndex: note_index,
			})
		);
		let newNotes = props.Content.notes.filter((_, i) => i !== note_index);
		props.setContent({ ...props.Content, notes: newNotes });
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
				<YoutubeEmbed src={props.Content.url} />
				<Row className="me-auto mt-2 justify-content-end">
					{!props.Content.isWatched && (
						<Button className="ms-3 w-auto" onClick={handleMarkAsWatched}>
							Mark as Watched
						</Button>
					)}
				</Row>
			</Col>
			<Col>
				<ListGroup className="px-3">
					{props.Content.notes.map((note, note_index) => (
						<>
							<ListGroup.Item
								key={`subtitle_${props.Content._id}_note_${note_index}_container`}
								variant="dark">
								<Row className="justify-content-between">
									<Col sm={11}>
										<p>{note}</p>
									</Col>
									<Col sm={1}>
										<Button
											className=" w-auto"
											variant="danger"
											key={`video_${props.Content._id}_notes_trash_button_${note_index}`}
											onClick={() => handleDeleteNote(note_index)}>
											<BsTrash key={`video_${props.Content._id}_notes_trash_${note_index}`} />
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
