import { CreateCourses, SearchCourses, DisplayCourses } from "../../features/index";
import { Link } from "react-router-dom";
import "./CoursePage.css";

const CourseDashboardPage = () => {
  return (
    <>
      <div className="top-level">
        <h3 className="header">Courses</h3>
        <Link to="addCourse">
          <CreateCourses />
        </Link>
      </div>

      <div className="search-course">
        <SearchCourses />
      </div>
      <div>
        <DisplayCourses />
      </div>
    </>
  );
};

export default CourseDashboardPage;
