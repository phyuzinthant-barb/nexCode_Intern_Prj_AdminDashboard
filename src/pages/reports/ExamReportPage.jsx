import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ExamReportTable } from "../../features";

const ExamReportPage = () => {
  return (
    <div>
      <p className="header">
        <Link to="/reports" className="arrow-icon">
          <ArrowLeftOutlined />
        </Link>
        Exam Name
      </p>
      <div className="exam-report-table">
        <ExamReportTable />
      </div>
    </div>
  )
}

export default ExamReportPage