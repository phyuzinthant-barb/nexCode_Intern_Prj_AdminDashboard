// CourseDashboardPage.js
import React, { useState } from "react";
import { CreateCourses, SearchCourses, DisplayCourses } from "../../features/index";
import { Link } from "react-router-dom";
import "./CoursePage.css";

const CourseDashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log(term);
  };

  return (
    <>
      <div className="top-level">
        <h3 className="header">Courses</h3>
        <Link to="addCourse">
          <CreateCourses />
        </Link>
      </div>
      <div>
        <DisplayCourses searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default CourseDashboardPage;
