import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/auth/AuthLayout";
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
  SignInPage,
  ForgotPasswordPage,
  VerifyOTPPage,
  ChangePwdPage
} from "./pages/index";

const App = () => {
  return (
    <Routes>
      <Route path="sign-in" element={<AuthLayout />}>
        <Route index element={<SignInPage />} />
        <Route path="forgot-password">
          <Route index element={<ForgotPasswordPage />} />
          <Route path="verify-otp">
            <Route index element={<VerifyOTPPage />} />
            <Route path="change-password" element={<ChangePwdPage />} />
          </Route>
        </Route>
      </Route>
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
