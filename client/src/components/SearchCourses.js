import { Button, Form } from "react-bootstrap";
import { useEffect, useRef } from "react";
import API from "../functions/api";
import { useSelector } from "react-redux";

export default function SearchCourses({
	setCourses,
	searchInInstructorCourses,
	hideSearch,
}) {
	const searchQuery = useRef("");
	const subjectFilter = useRef("");
	const maxPriceFilter = useRef("");
	const minPriceFilter = useRef("");
	const ratingFilter = useRef("");
	const user = useSelector((state) => state.userReducer.user);

	async function handleSubmit(e) {
		e.preventDefault();
		await getCourses();
	}

	useEffect(() => {
		getCourses();
	}, [user.country]);

	async function getCourses() {
		let searchParams = {};

		if (searchQuery.current.value)
			searchParams.searchQuery = searchQuery.current.value;
		if (subjectFilter.current.value)
			searchParams.subject = subjectFilter.current.value;
		if (maxPriceFilter.current.value)
			searchParams.maxPrice = maxPriceFilter.current.value;
		if (minPriceFilter.current.value)
			searchParams.minPrice = minPriceFilter.current.value;
		if (ratingFilter.current.value)
			searchParams.rating = ratingFilter.current.value;

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
			course.price =
				Math.trunc(course.price * user.exchangeRate * 100) / 100;
		});
		setCourses(courses);
	}

	return (
		<>
			{!hideSearch && (
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formSearchQuery">
						<Form.Label>Search Term</Form.Label>
						<Form.Control
							ref={searchQuery}
							type="search"
							placeholder="Search for a course by name, subject or instructors"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formSubjectFilter">
						<Form.Label>Subject</Form.Label>
						<Form.Control
							ref={subjectFilter}
							type="text"
							placeholder="Filter by a subject"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formPriceFilter">
						<Form.Label>Price ≤</Form.Label>
						<Form.Control
							ref={maxPriceFilter}
							type="text"
							placeholder="Filter by courses that are cheaper than this"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formPriceFilter">
						<Form.Label>Price ≥</Form.Label>
						<Form.Control
							ref={minPriceFilter}
							type="text"
							placeholder="Filter by courses that are cheaper than this"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formRatingFilter">
						<Form.Label>Rating ≥</Form.Label>
						<Form.Control
							ref={ratingFilter}
							type="text"
							placeholder="Filter by courses that are rated higher than this"
						/>
					</Form.Group>

					<Button type="submit">Search</Button>
				</Form>
			)}
		</>
	);
}
