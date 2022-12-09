import { Button, Form } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import API from "../api";
import { useSelector } from "react-redux";

function ListCourses({ setCourses }) {
	const searchQuery = useRef();
	const subjectFilter = useRef();
	const priceFilter = useRef();
	const ratingFilter = useRef();
	const country = useSelector((state) => state.userReducer.user.country);

	async function handleSubmit(e) {
		e.preventDefault();
		const courses = await getCourses();
		const coursesInLocalCurrency = await changeToLocalCurrency(courses);
		setCourses(coursesInLocalCurrency);
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

		const response = await API.get("courses", {
			params: searchParams
		});

		return response.data;
	}

	async function changeToLocalCurrency(courses) {
		if (!country) country = "USA";
		const responseCountryApi = await axios.get(
			`https://restcountries.com/v3.1/name/${country}`
		);
		const localCurrency = Object.keys(
			responseCountryApi.data[0].currencies
		)[0];
		const response = await axios.get(
			"https://api.apilayer.com/exchangerates_data/latest",
			{
				headers: {
					apikey: "R4m9vuzgmlrfLV99CNbJFSHqvJRgWDff"
				},
				params: {
					base: "USD"
				}
			}
		);
		const exchangeRate = response.data.rates[localCurrency];

		courses.forEach((course) => {
			course.price *= exchangeRate;
		});

		return courses;
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
