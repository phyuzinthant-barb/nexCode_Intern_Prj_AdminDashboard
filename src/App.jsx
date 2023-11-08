import MainLayout from "./layout/MainLayout";
import { Routes, Route } from "react-router-dom";
import {
  StudentDashboardPage,
  AddStudentPage,
  EditStudentPage,
  CourseDashboard,
  AddCoursePage,
  EditCoursePage,
  ExamDashboardPage,
  AddExamPage,
  AddQuestionPage,
  ReportDashboardPage,
  ExamReportPage,
  StudentReportPage,
  CourseReportPage,
} from "./pages/index";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<StudentDashboardPage />} />
        <Route path="addStu" element={<AddStudentPage />} />
        <Route path="editStu" element={<EditStudentPage />} />
        <Route path="courses">
          <Route index element={<CourseDashboard />} />
          <Route path="addCourse" element={<AddCoursePage />} />
          <Route path="editCourse" element={<EditCoursePage />} />
        </Route>
        <Route path="exams">
          <Route index element={<ExamDashboardPage />} />
          <Route path="addExam">
            <Route index element={<AddExamPage />} />
            <Route path="addQuestion" element={<AddQuestionPage />} />
          </Route>
        </Route>
        <Route path="reports">
          <Route index element={<ReportDashboardPage />} />
          <Route path=":courseId" element={<CourseReportPage />} /> 
          <Route path="examReport/:examId" element={<ExamReportPage />} />
          <Route path="studentReport/:stuId" element={<StudentReportPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
