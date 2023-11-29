import { Link } from "react-router-dom";
import { ExamReportPieChart, ExamReportTable } from "../../features";
import "../styles/report.css";
import { Breadcrumb } from "antd";

const ExamReportPage = () => {

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
            title: (
             "Course Report"
            ),
          },
          {
            title: 'Exam Report',
          },
        ]}
        ></Breadcrumb>
      <div className="report">
        <h3 className="report-header">Exam Report</h3>
      </div>
      <div className="bi-report">
        <ExamReportPieChart />
      </div>
      <div className="table">
        <ExamReportTable />
      </div>
    </>
  );
};

export default ExamReportPage;
