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
  ChangePwdPage,
} from "./pages/index";
import RequireAuth from "./features/auth/requireAuth";

const App = () => {
  return (
    // <BrowserRouter>
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
      {/* <Route element={<RequireAuth />}> */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }>
        <Route path="stu-dashboard">
          <Route index element={<StudentDashboardPage />} />
          <Route path="add-student" element={<AddStudentPage />} />
          <Route path="edit-student/:studentId" element={<EditStudentPage />} />
        </Route>
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
          <Route path="studentReport/:studentId" element={<StudentReportPage />} />
        </Route>
      </Route>
      {/* </Route> */}
    </Routes>
    // </BrowserRouter>
  );
};

export default App;
