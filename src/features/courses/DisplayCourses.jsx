import { Card, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAllCoursesQuery } from "./courseApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/Courses.css";

const DisplayCourses = () => {
  const token = useSelector((state) => state.authSlice.token);
  const { data: courses, isLoading, error, refetch } = useGetAllCoursesQuery(token);

  useEffect(() => {
    refetch();
  }, [refetch, token]);

  if (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <div className="card-design">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course) => (
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
