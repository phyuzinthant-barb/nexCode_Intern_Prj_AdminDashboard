import { Table, Button, Space } from "antd";
import "../styles/reports.css";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useGetOverallReportQuery } from "./reportApi";

const OverallReportTable = () => {
  const token = useSelector((state) => state.authSlice.token);
  const {
    data : overallReportData,
    isLoading: overallReportLoading,
    error: overallReportError,
  } = useGetOverallReportQuery(token);

  const dataSource = overallReportData
  ? overallReportData.map((course, index) => ({
      key: index + 1,
      courseId: course.courseId,
      courseName: course.courseName,
      totalNoOfStudents: course.totalNoOfStudents,
      inProgressStudents: course.inProgressStudents,
      completeStudents: course.completeStudents,
    }))
  : [];

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Courses",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Total Students",
      dataIndex: "totalNoOfStudents",
      key: "totalNoOfStudents",
    },
    {
      title: "Inprogress Students",
      dataIndex: "inProgressStudents",
      key: "inProgressStudents",
    },
    {
      title: "Complete Students",
      dataIndex: "completeStudents",
      key: "completeStudents",
    },
    {
      title: "View Detail",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={{
              pathname: `/reports/${record.courseId}`,
            }}>
            <Button type="primary">
              <EyeOutlined />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="overall-report-table">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default OverallReportTable;
