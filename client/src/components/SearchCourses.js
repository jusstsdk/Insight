import { Button, Form } from "react-bootstrap";
import { useRef } from "react";
import API from "../api";

function ListCourses({ setCourses }) {
	const searchQuery = useRef();
	const subjectFilter = useRef();
	const priceFilter = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		getCourses();
	}

	async function getCourses() {
		let searchParams = {};

		if (searchQuery.current.value)
			searchParams.searchQuery = searchQuery.current.value;
		if (subjectFilter.current.value)
			searchParams.subject = subjectFilter.current.value;
		if (priceFilter.current.value)
			searchParams.price = priceFilter.current.value;

		const response = await API.get("courses", {
			params: searchParams
		});

		setCourses(response.data);
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
						placeholder="Filter by price"
					/>
				</Form.Group>

				<Button type="submit">Search</Button>
			</Form>
		</>
	);
}

export default ListCourses;
