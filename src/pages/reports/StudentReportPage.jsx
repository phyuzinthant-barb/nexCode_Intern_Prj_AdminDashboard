import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { StudentReportTable } from "../../features";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { useGetAllStudentsQuery } from "../../features/students/studentApi";

const StudentReportPage = () => {

  const { studentId, courseId, examId } = useParams();
  const token = useSelector((state) => state.authSlice.token);
  const { data: studentData, isLoading, error } = useGetAllStudentsQuery(token);
  const currentStudent = studentData?.find(
    (student) => student.id === parseInt(studentId)
  );


  return (
    <div>
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
            title: <Link to={`/reports/${courseId}`}>Course Report</Link>,
          },
          {
            title: <Link to={`/reports/${courseId}/examReport/${examId}`}>Exam Report</Link>,
          },
          {
            title: 'Student Report',
          },
        ]}
        ></Breadcrumb>
      <p className="header">
      {currentStudent ? currentStudent.username : "Course Name Not Found"}
      </p>
      <div className="student-report-table">
        <StudentReportTable />
      </div>
    </div>
  );
};

export default StudentReportPage;
