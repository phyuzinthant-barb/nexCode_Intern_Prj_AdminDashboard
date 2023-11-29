import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { StudentReportTable } from "../../features";
import { Breadcrumb } from "antd";

const StudentReportPage = () => {

  return (
    <div>
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
            title: (
             "Course Report"
            ),
          },
          {
            title: 'Exam Report',
          },
          {
            title: 'Student Report',
          },
        ]}
        ></Breadcrumb>
      <p className="header">
        Student Name
      </p>
      <div className="student-report-table">
        <StudentReportTable />
      </div>
    </div>
  );
};

export default StudentReportPage;
