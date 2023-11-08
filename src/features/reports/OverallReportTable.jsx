import { Table } from "antd";
import "../styles/reports.css";

const OverallReportTable = () => {
  const dataSource = [
    {
      key: 1,
      course: "UI",
      totalStu: "79",
      inprogressStu: "32",
      completeStu: "47",
    },
    {
      key: 2,
      course: "UX",
      totalStu: "50",
      inprogressStu: "24",
      completeStu: "26",
    },
    {
      key: 3,
      course: "Java-Programming",
      totalStu: "36",
      inprogressStu: "11",
      completeStu: "25",
    },
    {
      key: 4,
      course: "React JS",
      totalStu: "89",
      inprogressStu: "29",
      completeStu: "60",
    },
  ];

  const dataWithSerialNumbers = dataSource.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Courses",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Total Students",
      dataIndex: "totalStu",
      key: "totalStu",
    },
    {
      title: "Inprogress Students",
      dataIndex: "inprogressStu",
      key: "inprogressStu",
    },
    {
      title: "Complete Students",
      dataIndex: "completeStu",
      key: "completeStu",
    },
  ];

  return (
    <div className="overall-report-table">
      <Table dataSource={dataWithSerialNumbers} columns={columns}/>
    </div>
  );
};

export default OverallReportTable;
