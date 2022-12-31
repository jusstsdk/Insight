import { Button, Col, Container, Form, Row, Collapse } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import API from "../functions/api";
import { useSelector } from "react-redux";
import { SUBJECTS } from "../functions/subjects";
import { Multiselect } from "multiselect-react-dropdown";
import { Drawer, List, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Rating } from "react-simple-star-rating";
import { BsFilter, BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
const drawerWidth = "25%";


export default function SearchCourses({ setCourses, searchInInstructorCourses, hideSearch, sort, setCurrentPage }) {
	const searchQuery = useRef("");
	// const subjectFilter = useRef("");
	const maxPriceFilter = useRef("");
	const minPriceFilter = useRef("");
	const [ratingFilter, setRatingFilter] = useState(0);
	const [subjectFilter, setSubjectFilter] = useState("");
	const user = useSelector((state) => state.userReducer.user);

	const [sort, setSort] = useState(false);
	const [open, setOpen] = useState(false);

	function comparePopularity(a, b) {
		if (a.enrolledTrainees.length > b.enrolledTrainees.length) return -1;
		if (a.enrolledTrainees.length < b.enrolledTrainees.length) return 1;
		return 0;
	}

	useEffect(() => {
		getCourses();
	}, [user.country, sort, ratingFilter, subjectFilter]);

	async function getCourses() {
		let searchParams = {};
		if (searchQuery.current.value) searchParams.searchQuery = searchQuery.current.value;
		if (subjectFilter) searchParams.subject = subjectFilter;
		if (maxPriceFilter.current.value) searchParams.maxPrice = maxPriceFilter.current.value/user.exchangeRate;
		if (minPriceFilter.current.value) searchParams.minPrice = minPriceFilter.current.value/user.exchangeRate;
		if (ratingFilter) searchParams.rating = ratingFilter;

		let courses;

		if (searchInInstructorCourses) {
			const response = await API.get(`instructors/${user._id}/courses`, {
				params: searchParams,
			});
			courses = response.data.courses;
		} else {
			const response = await API.get("courses", {
				params: searchParams,
			});
			courses = response.data;
		}

		courses.forEach((course) => {
			course.originalPrice = Math.trunc(course.originalPrice * user.exchangeRate * 100) / 100;
			course.price = Math.trunc(course.price * user.exchangeRate * 100) / 100;
		});
		if (sort) courses.sort(comparePopularity);
		setCourses(courses);
		setCurrentPage(1);
	}

	// Displays the Drawer Content based on props.subtitles
	const filterBar = (
		<>
			{!hideSearch && (
				<div className="d-flex  ">
					<Col sm={5} className=" align-items-center">
						<Multiselect
							id="singleSelectSubjects"
							options={SUBJECTS}
							selectedValues={subjectFilter ? [subjectFilter] : []}
							onSelect={(_, selectedItem) => {
								setSubjectFilter(selectedItem);
							}}
							onRemove={() => {
								setSubjectFilter("");
							}}
							isObject={false}
							placeholder="Select Subject Filter"
							closeOnSelect={true}
							showArrow={true}
							avoidHighlightFirstOption={true}
							hidePlaceholder={true}
						/>
					</Col>

					<Col
						sm={3}
						className={`d-flex justify-content-around align-items-center ${
							!searchInInstructorCourses ? "mx-auto" : "ms-2"
						}`}>
						<Form.Label className="fitWidth my-auto">Price</Form.Label>
						<Col className="me-1" sm={4}>
							<Form.Control
								ref={minPriceFilter}
								onChange={async () => await getCourses()}
								type="number"
								placeholder="Min"
							/>
						</Col>
						<Col className="" sm={4}>
							<Form.Control
								ref={maxPriceFilter}
								onChange={async () => await getCourses()}
								type="number"
								placeholder="Max"
							/>
						</Col>
					</Col>

					{!searchInInstructorCourses && (
						<Col
							sm={3}
							className="d-flex  justify-content-between align-items-center "
							controlId="formRatingFilter">
							<Form.Label className="fitWidth my-auto">Min Rating</Form.Label>
							<div className="fitWidth me-2">
								<Rating
									allowFraction="true"
									onClick={(rating) => setRatingFilter(rating)}
									size={28}
									initialValue={ratingFilter}
								/>
							</div>
							<Button onClick={() => setRatingFilter(0)} className="clearRatingButton">
								<AiOutlineClose color={"#dc3545"} />
							</Button>
						</Col>
					)}
				</div>
			)}
		</>
	);

	return (
		<>
			<Row className="mb-3 align-items-center">
				<Col sm={8}>
					<Form.Control
						ref={searchQuery}
						type="search"
						placeholder="Search for a course by name, subject or instructors"
					/>
				</Col>
				<Col sm={1} className="me-auto">
					<Button onClick={async () => await getCourses()}>
						<BsSearch />
					</Button>
				</Col>

				<Col sm={2}>
					<Form.Check
						type="checkbox"
						id={"default-checkbox"}
						label="Sort by popularity"
						className="fitWidth"
						onChange={() => setSort(!sort)}
					/>
				</Col>
				<Col sm={1} className="d-flex justify-content-end">
					<Button onClick={() => setOpen(!open)} aria-controls="filterBar" aria-expanded={open}>
						<BsFilter />
					</Button>
				</Col>
				<Collapse in={open}>
					<div id="filterBar" className="mt-3">
						{filterBar}
					</div>
				</Collapse>
			</Row>
		</>
	);
}
