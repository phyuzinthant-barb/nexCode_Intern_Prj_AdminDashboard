import { Table, Space, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { EyeOutlined } from "@ant-design/icons";
import "../styles/reports.css";
import { useSelector } from 'react-redux';
import { useGetCourseReportQuery} from "./reportApi";

const CourseReportTable = () => {
  const {courseId} = useParams();

  const token = useSelector((state) => state.authSlice.token);
  const {
    data : CourseReportData,
    isLoading: CourseReportLoading,
    error: CourseReportError,
  } = useGetCourseReportQuery({courseId, token});
  console.log(CourseReportData);

  const dataSource = CourseReportData
  ? CourseReportData.map((exam, index) => ({
      key: index + 1,
      examId: exam.examId,
      examName: exam.examName,
      levelName: exam.levelName,
      examPublishedDate: new Date(exam.examPublishedDate).toLocaleDateString(),
      inProgressStudents: exam.inProgressStudents,
      completedStudents: exam.completedStudents,
    }))
  : [];

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: 'Exam Name',
      dataIndex: 'examName',
      key: 'examName',
    },
    {
      title: 'Level',
      dataIndex: 'levelName',
      key: 'levelName',
    },
    {
      title: 'Exam Published Date',
      dataIndex: 'examPublishedDate',
      key: 'examPublishedDate',
    },
    {
      title: 'Inprogress Students',
      dataIndex: 'inProgressStudents',
      key: 'inProgressStudents',
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
              pathname: `/reports/examReport/${record.examId}`,
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
