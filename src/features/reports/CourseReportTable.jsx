import { Table, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from "@ant-design/icons";
import "../styles/reports.css";

const CourseReportTable = () => {
  const dataSource = [
    {
      key: 1,
      examName: 'Exam 1',
      level: 'Intermediate',
      examStartDate: '2023-11-10',
      inprogressStudents: '12',
      completedStudents: '8',
    },
    {
      key: 2,
      examName: 'Exam 2',
      level: 'Advanced',
      examStartDate: '2023-12-05',
      inprogressStudents: '15',
      completedStudents: '10',
    },
  ];

  const dataWithSerialNumbers = dataSource.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));

  const columns = [
    {
      title: 'No',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Exam Name',
      dataIndex: 'examName',
      key: 'examName',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Exam Start Date',
      dataIndex: 'examStartDate',
      key: 'examStartDate',
    },
    {
      title: 'Inprogress Students',
      dataIndex: 'inprogressStudents',
      key: 'inprogressStudents',
    },
    {
      title: 'Completed Students',
      dataIndex: 'completedStudents',
      key: 'completedStudents',
    },
    {
      title: "View Detail",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={{
              pathname: `/reports/examReport/${record.examName}`,
              state: { ...record },
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
    <div className="course-report-table">
      <Table dataSource={dataWithSerialNumbers} columns={columns} />
    </div>
  );
};

export default CourseReportTable;
