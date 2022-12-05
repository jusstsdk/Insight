import { Link } from 'react-router-dom';
import { useState,useRef } from "react";
import axios from "axios";
import API from "../api";
import { useSelector } from "react-redux";
import ListCourses from '../components/SearchCourses';


const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    return (
    <div className="course-list">
      <ListCourses setCourses={setCourses} />
      {courses.map(course => (
        <div className="course-preview" key={course._id} >
          
            <h2>{ course.title }</h2>
            <p>total hours { course.totalHours }</p>
            <p>price : { course.price }</p>
            <p>rating : { course.rating }</p>
          
        </div>
      ))}
    </div>
  );
}
 
export default AllCourses;