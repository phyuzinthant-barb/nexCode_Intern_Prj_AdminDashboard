import { useState } from 'react';
import { ReportHeader, ReportFilter } from '../../components';
import { ReportPieChart, OverallReportTable, CourseReportTable } from '../../features';
import "../styles/report.css";

const ReportDashboardPage = () => {
  const [selectedValue, setSelectedValue] = useState('Overall Course Report');

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <>
      <div className="top-level report">
        <h3 className="header">
          <ReportHeader selectedValue={selectedValue} />
        </h3>
        <div className="filter">
          <ReportFilter handleSelect={handleSelect} selectedValue={selectedValue} />
        </div>
      </div>
      <div className="bi-report">
        <ReportPieChart selectedValue={selectedValue} />
      </div>
      <div className="table">
        {selectedValue === 'Overall Course Report' ? (
          <OverallReportTable selectedValue={selectedValue} />
        ) : (
          <CourseReportTable selectedValue={selectedValue} />
        )}
      </div>
    </>
  );
};

export default ReportDashboardPage;
