import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { StudentReportTable } from "../../features";

const StudentReportPage = () => {

  return (
    <div>
      <p className="header">
        <Link to="/reports" className="arrow-icon">
          <ArrowLeftOutlined />
        </Link>
        Student Name
      </p>
      <div className="student-report-table">
        <StudentReportTable />
      </div>
    </div>
  );
};

export default StudentReportPage;
