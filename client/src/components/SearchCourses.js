import { Button, Form } from "react-bootstrap";
import { useRef } from "react";
import API from "../functions/api";
import { useSelector } from "react-redux";

function ListCourses({ setCourses }) {
	const searchQuery = useRef();
	const subjectFilter = useRef();
	const priceFilter = useRef();
	const ratingFilter = useRef();
	const user = useSelector((state) => state.userReducer.user);
	const userType = useSelector((state) => state.userReducer.type);

	async function handleSubmit(e) {
		e.preventDefault();
		let courses = await getCourses();
		courses.forEach((course) => {
			course.price *= user.exchangeRate;
		});
		setCourses(courses);
	}

	async function getCourses() {
		let searchParams = {};

		if (searchQuery.current.value)
			searchParams.searchQuery = searchQuery.current.value;
		if (subjectFilter.current.value)
			searchParams.subject = subjectFilter.current.value;
		if (priceFilter.current.value)
			searchParams.price = priceFilter.current.value;
		if (ratingFilter.current.value)
			searchParams.rating = ratingFilter.current.value;

		if (userType == "instructor") {
			const response = await API.get(`${user._id}/courses`, {
				params: searchParams,
			});

			return response.data;
		} else {
			const response = await API.get("courses", {
				params: searchParams,
			});

			return response.data;
		}
	}

	return (
		<>
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
						ref={priceFilter}
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
		</>
	);
}

export default ListCourses;
