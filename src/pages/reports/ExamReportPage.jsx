import { Link, useParams } from "react-router-dom";
import { ExamReportPieChart, ExamReportTable } from "../../features";
import "../styles/report.css";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { useGetAllExamsQuery } from "../../features/exams/examApi";

const ExamReportPage = () => {
  const { examId, courseId } = useParams();
  console.log(examId);
  const token = useSelector((state) => state.authSlice.token);
  const { data: examData, isLoading, error } = useGetAllExamsQuery(token);
  const currentExam = examData?.find(
    (exam) => exam.id === parseInt(examId)
  );

  return (
    <>
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
            title: 'Exam Report',
          },
        ]}
        ></Breadcrumb>
      <div className="report">
        <h3 className="report-header">{currentExam ? currentExam.name : "Course Name Not Found"}</h3>
      </div>
      <div className="bi-report">
        <ExamReportPieChart />
      </div>
      <div className="table">
        <ExamReportTable />
      </div>
    </>
  );
};

export default ExamReportPage;
