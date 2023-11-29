import { Link } from "react-router-dom";
import { CourseReportTable, CourseReportPieChart } from "../../features";
import "../styles/report.css";
import { Breadcrumb } from "antd";

const CourseReportPage = () => {
  return (
    <>
      <Breadcrumb
        style={{
          margin: "32px 29px 0px 29px",
          fontSize: "14px",
        }}
        items={[
          {
            title: (
              <Link to="/reports">Overall Courses Report</Link>
            ),
          },
          {
            title: 'Course Report',
          },
        ]}
        ></Breadcrumb>
      <div className="report">
        <h3 className="report-header">Course Report</h3>
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
