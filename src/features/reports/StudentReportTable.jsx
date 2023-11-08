import { Table } from "antd";
import "./reports.css";

const StudentReportTable = () => {
  const dataSource = [
    {
      key: 1,
      course: "UI",
      examName: "UI Design Exam",
      level: "basic",
      obtMarks: "70",
      status: "Passed",
    },
    {
      key: 2,
      course: "React JS",
      examName: "Redux Toolkit Exam",
      level: "intermediate",
      obtMarks: "90",
      status: "Passed",
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
      title: "Exam Name",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtMarks",
      key: "obtMarks",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusStyle = {
          color: status === "Passed" ? "green" : "red",
        };

        return (
          <span style={statusStyle}>
            <ul>
              <li>{status}</li>
            </ul>
          </span>
        );
      },
    },
  ];

  return (
    <div className="student-report-table">
      <Table dataSource={dataWithSerialNumbers} columns={columns} />
    </div>
  );
};

export default StudentReportTable;
