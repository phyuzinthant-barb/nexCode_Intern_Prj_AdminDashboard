import { Link, useParams } from "react-router-dom";
import { CourseReportTable, CourseReportPieChart } from "../../features";
import "../styles/report.css";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../../features/courses/courseApi";

const CourseReportPage = () => {
  const { courseId } = useParams();
  console.log(courseId);
  const token = useSelector((state) => state.authSlice.token);
  const { data: courseData, isLoading, error } = useGetAllCoursesQuery(token);
  const currentCourse = courseData?.find(
    (course) => course.id === parseInt(courseId)
  );

  return (
    <>
      <Breadcrumb
        style={{
          margin: "32px 29px 0px 29px",
          fontSize: "14px",
        }}
        items={[
          {
            title: <Link to="/reports">Overall Courses Report</Link>,
          },
          {
            title: <Link to={`/reports/${courseId}`}>Course Report</Link>,
            // path: `/reports/${courseId}`
          },
        ]}></Breadcrumb>
      <div className="report">
        <h3 className="report-header">
          {currentCourse ? currentCourse.name : "Course Name Not Found"}
        </h3>
      </div>
      <div className="bi-report">
        <CourseReportPieChart />
      </div>
      <div className="table">
        <CourseReportTable />
      </div>
    </>
  );
};

export default CourseReportPage;
