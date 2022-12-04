import { useState, useEffect } from "react";
import API from "../api";

function ListCourses({ searchQuery, priceFilter, subjectFilter }) {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		async function getCourses() {
			let url = `courses?`;
			if (searchQuery) url += `searchQuery=${searchQuery}}`;
			if (priceFilter) url += `&price=${priceFilter}}`;
			if (subjectFilter) url += `&subject=${subjectFilter}}`;
			const response = await API.get(url);
			setCourses(response.data);
		}

		getCourses();
	}, []);
	return <></>;
}

export default ListCourses;
