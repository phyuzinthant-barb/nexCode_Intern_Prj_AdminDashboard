import { useLocation } from "react-router-dom";

const ExamHeader = () => {
  const examData = useLocation()?.state;
  const { chooseCourse, chooseLvl, examName } = examData;
  let levelText = "";

  if (examData) {
    switch (chooseLvl) {
      case 1:
        levelText = "Basic";
        break;
      case 2:
        levelText = "Intermediate";
        break;
      case 3:
        levelText = "Advance";
        break;
      default:
        levelText = "Unknown Level";
    }
  }

  return (
    <div>
      {levelText && (
        <>
          <div>
            {chooseCourse} - {levelText} - {examName}
          </div>
        </>
      )}
    </div>
  );
};

export default ExamHeader;
