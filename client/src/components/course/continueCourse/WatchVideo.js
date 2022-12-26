import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import {
	addNoteToVideoNotes,
	deleteNoteFromVideoNotes,
	watchVideo,
} from "../../../redux/userSlice";
import { setContent } from "../../../redux/continueCourseSlice";
import { addNotification } from "../../../redux/notificationsSlice";
import API from "../../../functions/api";
import YoutubeEmbed from "../../YoutubeEmbed";
export default function WatchVideo(props) {
	// Setup
	const dispatch = useDispatch();

	// Page Control
	const User = useSelector((state) => state.userReducer.user);
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const NoteRef = useRef();
	const [Note, setNote] = useState("");

	// Gets Course Index in the User's Courses.
	const CourseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);
	const VideoIndex = User.courses[CourseIndex].subtitles[SubtitleIndex].videos.findIndex(
		(video) => video._id === Content._id
	);

	// Updates the status of the Video in Database, User and current Content.
	const handleMarkAsWatched = async () => {
		// Updates Video status in Database.
		let response = await API.put(`/courses/${User._id}/watchVideo`, {
			courseIndex: CourseIndex,
			subtitleIndex: SubtitleIndex,
			videoIndex: VideoIndex,
		});

		// Send the Certificate in a mail if the User completed the Course.
		let progress = response.data.courses[CourseIndex].progress;
		if (progress === 1) {
			await API.post(`/courses/sendCertificate`, {
				courseTitle: props.CourseTitle,
				email: User.email,
			});
			dispatch(
				addNotification({
					title: "Continue Course",
					info: "You have completed the Course! We have sent to you your Certificate.",
					color: "success",
				})
			);
		}

		// Updates Video status in UserReducer.
		dispatch(
			watchVideo({
				courseIndex: CourseIndex,
				subtitleIndex: SubtitleIndex,
				videoIndex: VideoIndex,
				progress: progress,
			})
		);

		// Updates Current Content
		dispatch(setContent({ ...Content, isWatched: true }));
	};

	// Adds a Note to the Video in Database, User and current Content.
	const handleAddNote = async () => {
		// Adds the Note to the Video in Database.
		let note = NoteRef.current.value;
		await API.put(`/courses/${User._id}/addNoteToVideoNotes`, {
			courseIndex: CourseIndex,
			subtitleIndex: SubtitleIndex,
			videoIndex: VideoIndex,
			note: note,
		});
		// Adds the Note to the Video in User.
		dispatch(
			addNoteToVideoNotes({
				courseIndex: CourseIndex,
				subtitleIndex: SubtitleIndex,
				videoIndex: VideoIndex,
				note: note,
			})
		);
		// Adds the Note to the Video in Content.
		dispatch(setContent({ ...Content, notes: [...Content.notes, note] }));
		setNote("");
	};

	// Removes a Note to the Video in Database, User and current Content.
	const handleDeleteNote = async (note_index) => {
		// Removes the Note from the Database.
		await API.put(`/courses/${User._id}/deleteNoteFromVideoNotes`, {
			courseIndex: CourseIndex,
			subtitleIndex: SubtitleIndex,
			videoIndex: VideoIndex,
			noteIndex: note_index,
		});
		// Removes the Note from the User.
		dispatch(
			deleteNoteFromVideoNotes({
				courseIndex: CourseIndex,
				subtitleIndex: SubtitleIndex,
				videoIndex: VideoIndex,
				noteIndex: note_index,
			})
		);
		// Removes the Note from the Content.
		let newNotes = Content.notes.filter((_, i) => i !== note_index);
		dispatch(setContent({ ...Content, notes: newNotes }));
	};

	// Downloads the Notes of the current Content.
	const handleDownloadNotes = () => {
		let notesFileArray = Content.notes.map((note, note_index) => {
			return `${note_index + 1}. ${note}\n`;
		});
		let notesFile = "";
		notesFileArray.forEach((line) => {
			notesFile += line;
		});
		const blob = new Blob([notesFile], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.download = `${Content.title}.txt`;
		link.href = url;
		link.click();
	};

	// Handles the automatic resize of Note Textarea.
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
			{/* Page Info */}
			<Col>
				<h4>{Content.title}</h4>
				<h6>{Content.description}</h6>
				<YoutubeEmbed src={Content.url} />
			</Col>
			{/* Page Control Buttons */}
			<Col>
				{/* Added Notes */}
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
				{/* Add Note Textarea */}
				<Form.Control
					className="my-2"
					as="textarea"
					value={Note}
					onChange={(e) => {
						setNote(e.target.value);
					}}
					ref={NoteRef}
					placeholder="Write a note"
					rows={3}
				/>
				{/* Controls */}
				<Row>
					{/* Notes Control */}
					<Col className="me-auto  justify-content-end">
						<Button className="w-auto me-3" onClick={handleAddNote}>
							Add Note
						</Button>
						<Button className="w-auto" onClick={handleDownloadNotes}>
							Download Notes
						</Button>
					</Col>
					{/* Video Control */}
					<Col className="me-auto d-flex justify-content-end">
						{!Content.isWatched && (
							<Button className="ms-3 w-auto" onClick={handleMarkAsWatched}>
								Mark Video as Watched
							</Button>
						)}
						{Content.isWatched && (
							<Button className="ms-3 w-auto" disabled>
								Marked as Watched
							</Button>
						)}
					</Col>
				</Row>
			</Col>
		</>
	);
}
