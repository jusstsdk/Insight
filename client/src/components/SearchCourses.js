import { Button, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import API from "../functions/api";
import { useSelector } from "react-redux";
import { SUBJECTS } from "../functions/subjects";
import { Multiselect } from "multiselect-react-dropdown";

export default function SearchCourses({ setCourses, searchInInstructorCourses, hideSearch, sort }) {
	const searchQuery = useRef("");
	// const subjectFilter = useRef("");
	const maxPriceFilter = useRef("");
	const minPriceFilter = useRef("");
	const ratingFilter = useRef("");
	const [subjectFilter, setSubjectFilter] = useState("");
	const user = useSelector((state) => state.userReducer.user);

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
	}, [user.country,sort]);

	async function getCourses() {
		let searchParams = {};
		if (searchQuery.current.value) searchParams.searchQuery = searchQuery.current.value;
		if (subjectFilter) searchParams.subject = subjectFilter;
		if (maxPriceFilter.current.value) searchParams.maxPrice = maxPriceFilter.current.value/user.exchangeRate;
		if (minPriceFilter.current.value) searchParams.minPrice = minPriceFilter.current.value/user.exchangeRate;
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
		console.log(user.exchangeRate);
		if(user.exchangeRate){
			courses.forEach((course) => {
			
				course.originalPrice =
					Math.trunc(course.originalPrice * user.exchangeRate * 100) /
					100;
				course.price =
					Math.trunc(course.price * user.exchangeRate * 100) / 100;
			});
		}
		
		if(sort) courses.sort(comparePopularity);
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
