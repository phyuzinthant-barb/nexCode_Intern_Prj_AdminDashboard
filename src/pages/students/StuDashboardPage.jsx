import {
  CreateStuBtn,
  FilterStu,
  SearchStu,
  DisplayStuTable,
} from "../../features/index";
import { Link } from "react-router-dom";
import "../styles/StudentPage.css";
import { useState, useEffect } from "react";

const StudentPage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState();

  const handleCourseChange = (selectedCourseId) => {
    setSelectedCourseId(selectedCourseId);
  };

  useEffect(() => {
    console.log(selectedCourseId);
  }, [selectedCourseId]);

  return (
    <>
      <div className="top-level">
        <h3 className="header">Students</h3>
        <Link to="add-student">
          <CreateStuBtn />
        </Link>
      </div>
      <div className="functionBlock">
        <FilterStu onCourseChange={handleCourseChange} />
        <SearchStu />
      </div>
      <div className="stuTable">
        <DisplayStuTable selectedCourseId={selectedCourseId} />
      </div>
    </>
  );
};

export default StudentPage;
