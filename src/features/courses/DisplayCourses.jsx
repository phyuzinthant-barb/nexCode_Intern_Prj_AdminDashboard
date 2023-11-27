import { Card, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAllCoursesQuery, useSearchCourseByNameQuery } from "./courseApi"; // Update the path
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/Courses.css";

const DisplayCourses = ({ searchTerm }) => {
  const token = useSelector((state) => state.authSlice.token);
  const {
    data: allCourses,
    isLoading: allCoursesLoading,
    error: allCoursesError,
    refetch: refetchAllCourses,
  } = useGetAllCoursesQuery(token);
  
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
    refetch: refetchSearchResults,
  } = useSearchCourseByNameQuery({ courseName: searchTerm });

  useEffect(() => {
    refetchAllCourses();
    // if (searchTerm) {
    //   refetchSearchResults({ courseName: searchTerm });
    // }
  }, [refetchAllCourses, token]);

  // searchTerm refetchSearchResults
  // console.log("All Courses:", allCourses);
  // console.log("Search Results:", searchResults);

  useEffect(()=> {
    if(searchTerm) {
      refetchSearchResults({courseName: searchTerm});
    }
  }, [refetchSearchResults, token, searchTerm])

  if (allCoursesError || searchError) {
    console.error("Error fetching courses:", allCoursesError || searchError);
  }

  const coursesToDisplay = searchTerm ? searchResults : allCourses;
  // console.log("Courses to Display:", coursesToDisplay);
  // console.log("Course length", coursesToDisplay.length);

  return (
    <div className="card-design">
      {allCoursesLoading || searchLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {coursesToDisplay.length > 0 ? (
            coursesToDisplay.map((course) => (
              <Card
                key={course.id}
                style={{
                  margin: "16px 0",
                  borderRadius: "2px",
                }}>
                <div className="course-card">
                  <div className="title">
                    <h4>{course.name}</h4>
                    <p>{course.description}</p>
                  </div>
                  <div className="action">
                    <Space size="middle">
                      <Link to={`editCourse/${course.id}`}>
                        <Button type="primary">
                          <EditOutlined />
                        </Button>
                      </Link>
                      <Button type="primary" danger>
                        <DeleteOutlined />
                      </Button>
                    </Space>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayCourses;
