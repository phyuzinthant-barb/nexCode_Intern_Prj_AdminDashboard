import { CreateExam, DisplayExam } from "../../features/index";
import { Link } from "react-router-dom";

const ExamDashboardPage = () => {
  return (
    <>
      <div className="top-level">
        <h3 className="header">Exams</h3>
        <Link to="addExam">
          <CreateExam />
        </Link>
      </div>
      <div>
        <DisplayExam />
      </div>
    </>
  );
};

export default ExamDashboardPage;
