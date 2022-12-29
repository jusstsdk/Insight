import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import API from "../functions/api";
import { useSelector } from "react-redux";
import { SUBJECTS } from "../functions/subjects";
import { Multiselect } from "multiselect-react-dropdown";
import { Drawer, List, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
const drawerWidth = "25%";

export default function SearchCourses({ setCourses, searchInInstructorCourses, hideSearch }) {
	const searchQuery = useRef("");
	// const subjectFilter = useRef("");
	const maxPriceFilter = useRef("");
	const minPriceFilter = useRef("");
	const ratingFilter = useRef("");
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
		if (ratingFilter.current.value) searchParams.rating = ratingFilter.current.value;

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
		<div className="mb-5">
			{/* Filler to avoid Navbar */}
			<Toolbar
				sx={{
					marginTop: {
						sm: `${mainNavbar ? mainNavbar.offsetHeight : ""}px`,
					},
				}}
			/>
			<Container id="drawerList">
				{!hideSearch && (
					<>
						<Form.Group className="mb-3" controlId="formSubjectFilter">
							<Form.Label>Subject</Form.Label>
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

						<Form.Group as={Row} className="my-3 mx-auto" controlId="formPriceFilter">
							<Form.Label className="fitWidth my-auto me-1">Price</Form.Label>
							<Col className="p-0 me-1" sm={4}>
								<Form.Control ref={minPriceFilter} type="number" placeholder="Min" />
							</Col>
							<Col className="p-0 me-1" sm={4}>
								<Form.Control ref={maxPriceFilter} type="number" placeholder="Max" />
							</Col>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formRatingFilter">
							<Form.Label>Rating ≥</Form.Label>
							<Form.Control
								ref={ratingFilter}
								type="text"
								placeholder="Filter by courses that are rated higher than this"
							/>
						</Form.Group>
						<Form.Check
							type="checkbox"
							id={"default-checkbox"}
							label="Sort by popularity"
							onChange={() => setSort(!sort)}
						/>

						<Button onClick={async () => await getCourses()}>Search</Button>
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
			<Form.Group className="mb-3" controlId="formSearchQuery">
				<Form.Label>Search Term</Form.Label>
				<Form.Control
					ref={searchQuery}
					type="search"
					placeholder="Search for a course by name, subject or instructors"
				/>
			</Form.Group>
		</>
	);
}
