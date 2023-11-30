import { Card, Button, Space, Modal } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAllCoursesQuery, useSearchCourseByNameQuery, useDeleteCourseByIdMutation } from "./courseApi"; 
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/Courses.css";

const { confirm } = Modal;

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

  const [deleteCourseMutation] = useDeleteCourseByIdMutation(token);

  useEffect(() => {
    refetchAllCourses();
  }, [refetchAllCourses, token]);

  // useEffect(() => {
  //   if (searchTerm) {
  //     refetchSearchResults({ courseName: searchTerm });
  //   }
  // }, [refetchSearchResults, token, searchTerm]);


  const handleDelete = (courseId) => {
    confirm({
      title: "Are you sure you want to delete this course?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCourseMutation({ courseId })
          .then(() => {
            refetchAllCourses();
          })
          .catch((error) => {
            console.error("Error deleting course:", error);
          });
      },
    });
  };
  

  // if (allCoursesError || searchError) {
  //   console.error("Error fetching courses:", allCoursesError || searchError);
  // }

  const coursesToDisplay = searchTerm ? searchResults : allCourses;

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
                }}
              >
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
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(course.id)}
                      >
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
