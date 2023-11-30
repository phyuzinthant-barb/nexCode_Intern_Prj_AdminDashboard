import { Card, Button, Space, Modal, Empty } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAllCoursesQuery, useDeleteCourseByIdMutation } from "./courseApi"; 
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/Courses.css";

const { confirm } = Modal;

const DisplayCourses = () => {
  const token = useSelector((state) => state.authSlice.token);
  const {
    data: allCourses,
    isLoading: allCoursesLoading,
    error: allCoursesError,
    refetch: refetchAllCourses,
  } = useGetAllCoursesQuery(token);

  const [deleteCourseMutation] = useDeleteCourseByIdMutation(token);

  useEffect(() => {
    refetchAllCourses();
  }, [refetchAllCourses, token]);

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

  const coursesToDisplay = allCourses;

  return (
    <div className="card-design">
      {allCoursesLoading  ? (
        <Empty />
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
            <Empty />
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayCourses;
