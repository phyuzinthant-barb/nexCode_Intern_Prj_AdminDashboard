import { CreateExam, DisplayExam } from "../../features/index";
import { Link } from "react-router-dom";

const ExamDashboardPage = () => {
  return (
    <section>
      <div className="top-level">
        <h3 className="header">Exams</h3>
        <Link to="addExam">
          <CreateExam />
        </Link>
      </div>
      <div>
        <DisplayExam />
      </div>
    </section>
  );
};

export default ExamDashboardPage;
