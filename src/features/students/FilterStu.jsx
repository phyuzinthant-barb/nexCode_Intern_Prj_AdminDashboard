import React, { useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../courses/courseApi";

const App = ({onCourseChange}) => {
  const token = useSelector((state) => state.authSlice.token);

  const { data: courses = [], isLoading: isLoadingCourses } = useGetAllCoursesQuery(token);

  const handleCourseChange = (value) => {
    onCourseChange(value);
    console.log(value);
  };

  return (
    <div className="filter-course">
      <Select
         showSearch
         placeholder="Select Course"
         optionFilterProp="children"
         filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
         onChange={handleCourseChange}
      >
        {isLoadingCourses ? (
          <Select.Option value="" disabled>Loading...</Select.Option>
        ) : (
          courses.map((course) => (
            <Select.Option key={course.id} value={course.id}>
              {course.name}
            </Select.Option>
          ))
        )}
      </Select>
    </div>
  );
};
export default App;
