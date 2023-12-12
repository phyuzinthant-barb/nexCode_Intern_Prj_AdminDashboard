import {
  CreateStuBtn,
  FilterStu,
  SearchStu,
  DisplayStuTable,
} from "../../features/index";
import { Link } from "react-router-dom";
import "../styles/StudentPage.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAllStudentsQuery } from "../../features/students/studentApi";

const StudentPage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("all");

  const token = useSelector((state) => state.authSlice.token);
  const { data: allStudents, isLoading, error } = useGetAllStudentsQuery(token);

  const handleCourseChange = (selectedCourseId) => {
    setSelectedCourseId(selectedCourseId);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchStudentRollNo, setSearchStudentRollNo] = useState(null);
  const [searchStudentEmail, setSearchStudentEmail] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    console.log(term);

    const foundStudent = allStudents.find(
      (student) =>
        student.email.toLowerCase() === term.toLowerCase() ||
        student.rollNo.toLowerCase() === term.toLowerCase()
    );

    if (foundStudent) {
      setSearchStudentEmail(foundStudent.email);
      setSearchStudentRollNo(foundStudent.rollNo);
      console.log("Searched student email:", foundStudent.email);
      console.log("Searched student roll number:", foundStudent.rollNo);
    } else {
      setSearchStudentEmail(null);
      setSearchStudentRollNo(null);
      console.log("Student not found");
    }
  };

  useEffect(() => {
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
        <SearchStu onSearch={handleSearch} />
      </div>
      <div className="stuTable">
        <DisplayStuTable selectedCourseId={selectedCourseId} foundStudent={searchTerm}/>
      </div>
    </>
  );
};

export default StudentPage;
