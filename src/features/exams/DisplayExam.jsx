import { useEffect, useState } from "react";
import { Card, Button, Space, Switch } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAllExamsQuery } from "./examApi";
import { useSelector } from "react-redux";
import "../styles/Exam.css";

const DisplayExam = () => {
  const token = useSelector((state) => state.authSlice.token);
  const { data: exams, isLoading, error,refetch } = useGetAllExamsQuery(token);

  // console.log("exams:", exams);

  if (error) {
    console.error("Error fetching exams:", error);
  }

  useEffect(() => {
    refetch();
  }, [refetch, token]);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [initialButtonsShown, setInitialButtonsShown] = useState(true);

  const onSwitchChange = (checked) => {
    setIsSwitchOn(checked);
    if (checked) {
      setInitialButtonsShown(false);
    }
  };

  return (
    <div className="card-design">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Array.isArray(exams) && exams.length > 0 ? (
            exams.map((exam) => (
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
                      <Switch onChange={onSwitchChange} />
                    </div>
                    <h4 className="exam-name">
                      {exam.category.name} - {exam.level.level} - {exam.name}
                    </h4>
                    <p>{exam.description}</p>
                    <div className="info-group">
                      <div className="exam-info question">
                        {exam.noOfQuestion} Questions
                      </div>
                      <div className="exam-info marks">
                        {exam.examTotalMark} Marks
                      </div>
                      <div className="exam-info time">
                        {exam.examDurationMinute} mins
                      </div>
                    </div>
                  </div>

                  <div className="action">
                    <Space size="middle">
                      {initialButtonsShown ? (
                        <>
                          <Link to={`editExam/${exam.id}`}>
                            <Button type="primary">
                              <EditOutlined />
                            </Button>
                          </Link>
                          <Button type="primary" danger>
                            <DeleteOutlined />
                          </Button>
                        </>
                      ) : (
                        <Button className="view-questions-btn" type="primary">
                          View All Questions
                        </Button>
                      )}
                    </Space>
                  </div>
                </div>
              </Card>
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
