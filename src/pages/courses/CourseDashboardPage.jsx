import React, { useState } from "react";
import { CreateCourses, SearchCourses, DisplayCourses } from "../../features/index";
import { Link } from "react-router-dom";
import "./CoursePage.css";
import { useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../../features/courses/courseApi";

const CourseDashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchedCourseId, setSearchedCourseId] = useState('');

  // const token = useSelector((state) => state.authSlice.token);
  // const { data: Courses, isLoading, error, refetch } = useGetAllCoursesQuery(token);

  // const handleSearch = (term) => {
  //   setSearchTerm(term.toLowerCase());
  //   console.log(term);

  //   if (Courses) {
  //     const foundCourse = Courses.find(
  //       (course) => course?.name.toLowerCase() === term.toLowerCase()
  //     );
  //     console.log(foundCourse);

  //     if (foundCourse) {
  //       setSearchedCourseId(foundCourse.id);
  //       console.log("Searched Course ID:", foundCourse.id);
  //     } else {
  //       setSearchedCourseId(null);
  //       console.log("Course not found");
  //     }
  //   }
  // };

  return (
    <>
      <div className="top-level">
        <h3 className="header">Courses</h3>
        <Link to="addCourse">
          <CreateCourses />
        </Link>
      </div>
      {/* <div className="search-course">
         <SearchCourses onSearch={handleSearch} />
       </div> */}
      <div>
        <DisplayCourses searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default CourseDashboardPage;
