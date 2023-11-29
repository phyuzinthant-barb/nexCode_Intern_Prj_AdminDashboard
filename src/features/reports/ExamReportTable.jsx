import { Table, Space, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { EyeOutlined } from "@ant-design/icons";
import "../styles/reports.css";
import { useGetExamReportQuery} from "./reportApi";
import { useSelector } from 'react-redux';

const CourseReportTable = () => {
  const {examId} = useParams();

  const token = useSelector((state) => state.authSlice.token);

  const {
    data : ExamReportData,
    isLoading: ExamReportLoading,
    error: ExamReportError,
  } = useGetExamReportQuery({examId, token});
  // console.log(ExamReportData);

  const dataSource = ExamReportData
  ? ExamReportData.map((exam, index) => ({
      key: index + 1,
      studentId: exam.id,
      rollNo: exam.rollNo,
      userName: exam.userName,
      email: exam.email,
      obtainedMark: exam.obtainedMark,
      passFail: exam.passFail,
    }))
  : [];

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: 'Student ID',
      dataIndex: 'rollNo',
      key: 'rollNo',
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Obtained Marks',
      dataIndex: 'obtainedMark',
      key: 'obtainedMark',
    },
    {
      title: 'Status',
      dataIndex: 'passFail',
      key: 'passFail',
      render: (passFail) => {
        const statusStyle = {
          color: passFail ? 'green' : 'red',
        };
  
        return (
          <span style={statusStyle}>
            <ul>
              <li>{passFail ? 'Passed' : 'Failed'}</li>
            </ul>
          </span>
        );
      },
    },
    {
      title: "View Detail",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={{
              pathname: `/reports/examReport/${record.studentId}`,
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
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default CourseReportTable;
