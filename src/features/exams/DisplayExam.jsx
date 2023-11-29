import { useEffect, useState } from "react";
import { Card, Button, Space, Switch, Modal, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetAllExamsQuery,
  usePublishExamMutation,
  useUnpublishExamMutation,
} from "./examApi";
import { useSelector } from "react-redux";
import "../styles/Exam.css";

const { confirm } = Modal;

const ExamCard = ({ exam, refetch }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(exam.published);
  const [initialButtonsShown, setInitialButtonsShown] = useState(true);

  const [publishExamMutation] = usePublishExamMutation();
  const [unpublishExamMutation] = useUnpublishExamMutation();

  const handleClick = () => {
    confirm({
      title: "Are you sure, you will make this exam publish?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      cancelText: "No",
      onOk() {
        handlePublishExam();
      },
      onCancel() {
        setIsSwitchOn(isSwitchOn);
        setInitialButtonsShown(true);
      },
    });
  };

  const handleSwitchChange = (checked) => {
    if (!isSwitchOn) {
      handleClick();
    } else {
      handleUnpublishExam();
    }
  };

  const handlePublishExam = async () => {
    try {
      const { data, error } = await publishExamMutation({
        examId: exam.id,
        published: true,
      });

      if (data) {
        console.log("Exam published successfully");
        message.success("Exam published successfully");
        setIsSwitchOn(true);
        setInitialButtonsShown(false);
        refetchExams();
      } else {
        console.error("Error publishing exam:", error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleUnpublishExam = async () => {
    try {
      const { data, error } = await unpublishExamMutation({
        examId: exam.id,
        published: false,
      });

      if (data) {
        console.log("Exam unpublished successfully");
        message.success("Exam unpublished successfully");
        setIsSwitchOn(false);
        setInitialButtonsShown(false);
        refetchExams();
      } else {
        console.error("Error unpublishing exam:", error);
        message.error("Can't be unpublished because already has examinees.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const refetchExams = () => {
    refetch();
  };

  const navigate = useNavigate();

  const handleViewQuestions = () => {
    navigate(`/exams/view-question/${exam.id}`, { state: { ...exam } });
  };

  return (
    <Card
      key={exam.id}
      style={{
        margin: "16px 0",
        borderRadius: "2px",
        backgroundColor: "#F0F0F0",
      }}>
      <div className="course-card">
        <div className="title">
          <div className="publish-switch">
            <Switch onChange={handleSwitchChange} checked={isSwitchOn} />
          </div>
          <h4 className="exam-name">
            {exam.category.name} - {exam.level.level} - {exam.name}
          </h4>
          <p>{exam.description}</p>
          <div className="info-group">
            <div className="exam-info question">
              {exam.noOfQuestion} Questions
            </div>
            <div className="exam-info marks">{exam.examTotalMark} Marks</div>
            <div className="exam-info time">{exam.examDurationMinute} mins</div>
          </div>
        </div>

        <div className="action">
          <Space size="middle">
            <div className="publish-switch"></div>
            {initialButtonsShown && (
              <>
                <Link to={`edit-exam/${exam.id}`}>
                  <Button type="primary">
                    <EditOutlined />
                  </Button>
                </Link>
                <Button type="primary" danger>
                  <DeleteOutlined />
                </Button>
              </>
            )}
            {!initialButtonsShown && ( 
                <Button className="view-questions-btn" type="primary" onClick={handleViewQuestions}>
                  View All Questions
                </Button>
            )}
          </Space>
        </div>
      </div>
    </Card>
  );
};

const DisplayExam = () => {
  const token = useSelector((state) => state.authSlice.token);
  const { data: exams, isLoading, error, refetch } = useGetAllExamsQuery(token);

  if (error) {
    console.error("Error fetching exams:", error);
  }

  useEffect(() => {
    refetch();
  }, [refetch, token]);

  return (
    <div className="card-design">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Array.isArray(exams) && exams.length > 0 ? (
            exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} refetch={refetch} />
            ))
          ) : (
            <p>No exams available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayExam;
