import React, { useEffect } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../courses/courseApi";

const App = ({onCourseChange}) => {
  const token = useSelector((state) => state.authSlice.token);

  const { data: courses = [], isLoading: isLoadingCourses } = useGetAllCoursesQuery(token);

  // useEffect(() => {
  //   console.log(onCourseChange);
  // }, [onCourseChange]);

  const handleCourseChange = (value) => {
    onCourseChange(value);
  };

  return (
    <div className="filter-course">
      <Select
         showSearch
         placeholder="Select Course"
         optionFilterProp="children"
         filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
         onChange={handleCourseChange}
         defaultValue={"all"}
      >
        <Select.Option value="all">All</Select.Option>
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
