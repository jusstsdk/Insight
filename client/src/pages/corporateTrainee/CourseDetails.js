import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";



const CourseDetails = () => {
	const { id } = useParams();
    const [course, setCourse] = useState(null);
    async function getCourse(id) {
    
        const response = await API.get("courses/" + id);
        setCourse(response.data);
    }
    
    useEffect(() => {
        getCourse(id)
        
    }, []);

	return <div>{course && course.title}</div>;
};

export default CourseDetails;
