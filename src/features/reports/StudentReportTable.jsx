import { Table } from "antd";
import "../styles/reports.css";
import { useParams } from "react-router-dom";
import { useGetStudentReportQuery } from "./reportApi";
import { useSelector } from "react-redux";

const StudentReportTable = () => {
  const {studentId} = useParams();
  console.log(studentId);

  const token = useSelector((state) => state.authSlice.token);
  const {
    data : StudentReportData,
    isLoading: StudentReportLoading,
    error: StudentReportError,
  } = useGetStudentReportQuery({studentId, token});

  const dataSource = StudentReportData
  ? StudentReportData.map((student, index) => ({
      key: index + 1,
      courseName: student.courseName,
      examName: student.examName,
      levelName: student.levelName,
      obtainedResult: student.obtainedResult,
      isPass: student.isPass,
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
      title: "Exam Name",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Level",
      dataIndex: "levelName",
      key: "levelName",
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedResult",
      key: "obtainedResult",
    },
    {
      title: 'Status',
      dataIndex: 'isPass',
      key: 'isPass',
      render: (isPass) => {
        const statusStyle = {
          color: isPass ? 'green' : 'red',
        };
  
        return (
          <span style={statusStyle}>
            <ul>
              <li>{isPass ? 'Passed' : 'Failed'}</li>
            </ul>
          </span>
        );
      },
    },
  ];

  return (
    <div className="student-report-table">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default StudentReportTable;
