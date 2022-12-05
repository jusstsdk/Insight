import { Link } from 'react-router-dom';
import { useState,useRef } from "react";
import axios from "axios";
import API from "../api";
import { useSelector } from "react-redux";
import ListCourses from './SearchCourses';
import CourseCard from './CourseCard';


const CourseList = () => {
    const [courses, setCourses] = useState([]);
    return (
    <div className="course-list">
      <ListCourses setCourses={setCourses} />
      
      {courses && courses.map(course => (
        <div className="course-preview" key={course._id} >
          
            <CourseCard course={course}/>
          
        </div>
      ))}
    </div>
  );
}
 
export default CourseList;