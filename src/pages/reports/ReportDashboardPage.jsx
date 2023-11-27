import { ReportPieChart, OverallReportTable } from "../../features";
import "../styles/report.css";
import { Breadcrumb } from "antd";

const ReportDashboardPage = () => {

  return (
    <>
    <Breadcrumb
            style={{
              margin: '32px 29px 0px 29px',
              fontSize: '14px',
            }}
          >
            <Breadcrumb.Item>Overall Courses Report</Breadcrumb.Item>
          </Breadcrumb>
      <div className="report">
        <h3 className="report-header">Overall Courses Report</h3>
      </div>
      <div className="bi-report">
        <ReportPieChart />
      </div>
      <div className="table">
        <OverallReportTable />
      </div>
    </>
  );
};

export default ReportDashboardPage;
