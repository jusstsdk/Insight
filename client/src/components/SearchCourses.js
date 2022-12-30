import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import API from "../functions/api";
import { useSelector } from "react-redux";
import { SUBJECTS } from "../functions/subjects";
import { Multiselect } from "multiselect-react-dropdown";
import { Drawer, List, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Rating } from "react-simple-star-rating";
import { BsSearch } from "react-icons/bs";
const drawerWidth = "25%";

export default function SearchCourses({ setCourses, searchInInstructorCourses, hideSearch }) {
	const searchQuery = useRef("");
	// const subjectFilter = useRef("");
	const maxPriceFilter = useRef("");
	const minPriceFilter = useRef("");
	const [ratingFilter, setRatingFilter] = useState(0);
	const [subjectFilter, setSubjectFilter] = useState("");
	const user = useSelector((state) => state.userReducer.user);

	const [sort, setSort] = useState(false);

	function comparePopularity(a, b) {
		if (a.enrolledTrainees.length > b.enrolledTrainees.length) return -1;
		if (a.enrolledTrainees.length < b.enrolledTrainees.length) return 1;
		return 0;
	}
	async function handleSubmit(e) {
		e.preventDefault();
		await getCourses();
	}

	useEffect(() => {
		getCourses();
	}, [user.country, sort]);

	async function getCourses() {
		let searchParams = {};
		if (searchQuery.current.value) searchParams.searchQuery = searchQuery.current.value;
		if (subjectFilter) searchParams.subject = subjectFilter;
		if (maxPriceFilter.current.value) searchParams.maxPrice = maxPriceFilter.current.value;
		if (minPriceFilter.current.value) searchParams.minPrice = minPriceFilter.current.value;
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
	}
	const mainNavbar = document.getElementById("main-navbar");

	// Displays the Drawer Content based on props.subtitles
	const drawer = (
		<div className="">
			{/* Filler to avoid Navbar */}
			<Toolbar
				sx={{
					marginTop: {
						sm: `${mainNavbar ? mainNavbar.offsetHeight : ""}px`,
					},
				}}
			/>
			<Container id="searchDrawer" className="my-auto">
				{!hideSearch && (
					<>
						<h3 className="mb-3">Filters</h3>
						<Form.Group className="mb-3" controlId="formSubjectFilter">
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
						</Form.Group>

						<Form.Group className="my-3 d-flex" controlId="formPriceFilter">
							<Form.Label className="fitWidth my-auto me-1">Price</Form.Label>
							<Col className="p-0 me-1 ms-auto" sm={4}>
								<Form.Control ref={minPriceFilter} type="number" placeholder="Min" />
							</Col>
							<Col className="p-0 me-1" sm={4}>
								<Form.Control ref={maxPriceFilter} type="number" placeholder="Max" />
							</Col>
						</Form.Group>

						{!searchInInstructorCourses && (
							<Form.Group
								className="mb-3 d-flex  justify-content-between "
								controlId="formRatingFilter">
								<Form.Label className="me-3 my-auto">Min Rating</Form.Label>
								<div className="fitWidth">
									<Rating
										allowFraction="true"
										onClick={(rating) => setRatingFilter(rating)}
										/* Available Props */
									/>
								</div>
							</Form.Group>
						)}
						<Form.Group className="d-flex justify-content-between">
							<Col sm={8}>
								<Form.Check
									type="checkbox"
									id={"default-checkbox"}
									label="Sort by popularity"
									className="fitWidth"
									onChange={() => setSort(!sort)}
								/>
							</Col>

							<Button onClick={async () => await getCourses()}>Filter</Button>
						</Form.Group>
					</>
				)}
			</Container>
		</div>
	);

	return (
		<>
			<Box
				// key={`course_${Course._id}_drawer_box`}
				className="drawerZ-index"
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders">
				{/* Normal Screen Drawer */}
				<Drawer
					// key={`course_${Course._id}_normal_screen_drawer`}
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Row className="mb-3 align-items-center">
				<Form.Label className="fitWidth my-auto">Search Term</Form.Label>

				<Col sm={9}>
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
			</Row>
		</>
	);
}
