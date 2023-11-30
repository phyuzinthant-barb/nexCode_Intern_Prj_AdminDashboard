import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../../features/courses/courseApi";

const ExamHeader = () => {
  const payload = useLocation()?.state;
  const { courseId, levelId, name } = payload;
  const token = useSelector((state) => state.authSlice.token);
  const { data: courseData, isLoading, error } = useGetAllCoursesQuery(token);
  const currentCourse = courseData?.find(
    (course) => course.id === parseInt(courseId)
  );
  let levelText = "";

  if (payload) {
    switch (levelId) {
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
      {levelId && (
        <>
          <div>
            {currentCourse} - {levelText} - {name}
          </div>
        </>
      )}
    </div>
  );
};

export default ExamHeader;
