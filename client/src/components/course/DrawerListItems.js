import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import BookIcon from "@mui/icons-material/Book";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import { resetExerciseInfo, setContentInfo } from "../../redux/continueCourseSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DrawerListItems({
	subtitle,
	subtitle_index,
	openCollapses,
	setOpenCollapses,
	handleOpenCollapse,
	combineContent,
	setupExercise,
}) {
	const dispatch = useDispatch();
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const SelectedContentIndex = useSelector(
		(state) => state.continueCourseReducer.selectedContentIndex
	);
	const handlePressOnContent = (content, content_index, subtitle_index) => {
		let openCollapsesArray = [...openCollapses].map((_, index) => index === subtitle_index);
		setOpenCollapses(openCollapsesArray);
		let type;
		if (content.type === "Video") type = "Video";
		else {
			type = "Exercise";
			setupExercise(content);
		}
		dispatch(
			setContentInfo({
				content: content,
				contentType: type,
				subtitleIndex: subtitle_index,
				selectedContentIndex: content_index,
			})
		);
	};

	const listItem = (
		<>
			{/* Subtitle Icon and Title */}
			<ListItem
				key={`subtitle_${subtitle._id}_title_and_icon_${subtitle_index}`}
				button
				onClick={() => handleOpenCollapse(subtitle_index)}>
				<ListItemIcon key={`subtitle_${subtitle._id}_listItemIcon_${subtitle_index}`}>
					<BookIcon key={`subtitle_${subtitle._id}_bookIcon_${subtitle_index}`} />
				</ListItemIcon>
				<ListItemText
					primary={subtitle.title}
					key={`subtitle_${subtitle._id}_listItemText_${subtitle_index}`}
				/>
				{openCollapses[subtitle_index] ? (
					<ExpandLess key={`subtitle_${subtitle._id}_ExpandLess_${subtitle_index}`} />
				) : (
					<ExpandMore key={`subtitle_${subtitle._id}_ExpandMore_${subtitle_index}`} />
				)}
			</ListItem>
		</>
	);

	const collapse = (
		<Collapse
			key={`subtitle_${subtitle._id}_collapse_${subtitle_index}`}
			in={openCollapses[subtitle_index]}
			timeout="auto"
			unmountOnExit>
			<List
				key={`subtitle_${subtitle._id}_collapse_list_${subtitle_index}`}
				component="div"
				disablePadding>
				{combineContent(subtitle).map((singleContent, singleContent_index) => (
					<ListItem
						key={`subtitle_${subtitle._id}_content_${singleContent._id}`}
						button
						style={{
							backgroundColor:
								singleContent_index === SelectedContentIndex && subtitle_index === SubtitleIndex
									? "#939d9e"
									: "",
						}}
						variant={
							singleContent_index === SelectedContentIndex && subtitle_index === SubtitleIndex
								? "success"
								: "danger"
						}
						onClick={() =>
							handlePressOnContent(singleContent, singleContent_index, subtitle_index)
						}>
						{/* Content Icon */}
						<ListItemIcon
							className="ms-4"
							key={`subtitle_${subtitle._id}_content_${singleContent._id}_icon_${singleContent_index}`}>
							{singleContent.type === "Video" ? (
								<OndemandVideoIcon
									className={singleContent.isWatched ? "success ms-0 me-3" : "me-3"}
									key={`subtitle_${subtitle._id}_content_${singleContent._id}_OndemandVideoIcon_${singleContent_index}`}
								/>
							) : (
								<QuizIcon
									className={
										singleContent.isSolved &&
										singleContent.receivedGrade / singleContent.maxGrade >= 0.5
											? "success me-3"
											: singleContent.isSolved &&
											  singleContent.receivedGrade / singleContent.maxGrade < 0.5
											? "error me-3"
											: "me-3"
									}
									key={`subtitle_${subtitle._id}_content_${singleContent._id}_QuizIcon_${singleContent_index}`}
								/>
							)}
						</ListItemIcon>
						{/* Content Text */}
						<ListItemText
							key={`subtitle_${subtitle._id}_content_${singleContent._id}_text_${singleContent_index}`}
							inset
							className="ps-0 text-wrap"
							primary={singleContent.title}
						/>
					</ListItem>
				))}
			</List>
		</Collapse>
	);
	return (
		<>
			{listItem}
			{collapse}
		</>
	);
}
