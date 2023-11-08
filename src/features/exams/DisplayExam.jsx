import { useState } from "react";
import { Card, Button, Space, Switch } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Exam.css";

const DisplayExam = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [initialButtonsShown, setInitialButtonsShown] = useState(true);

  const onSwitchChange = (checked) => {
    setIsSwitchOn(checked);
    if (checked) {
      setInitialButtonsShown(false);
    }
  };

  return (
    <Card
      style={{
        width: "1170px",
        margin: "32px 32px 0px 32px",
        borderRadius: "2px",
        backgroundColor: "#F0F0F0",
      }}>
      <div className="course-card">
        <div className="title">
          <div className="publish-switch">
            <Switch onChange={onSwitchChange} />
          </div>
          <h4 className="exam-name">UI-basic-exam</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            repellendus accusamus ut quibusdam atque fuga mollitia blanditiis
            vitae, libero accusantium amet distinctio enim, magni culpa illo
            dignissimos explicabo ratione exercitationem!
          </p>
          <div className="info-group">
            <div className="exam-info question">10 Questions</div>
            <div className="exam-info marks">100 Marks</div>
            <div className="exam-info time">50 mins</div>
          </div>
        </div>

        <div className="action">
          <Space size="middle">
            {initialButtonsShown ? (
              <>
                <Link to="editCourse">
                  <Button type="primary">
                    <EditOutlined />
                  </Button>
                </Link>
                <Button type="primary" danger>
                  <DeleteOutlined />
                </Button>
              </>
            ) : (
              <Button className="view-questions-btn" type="primary">View All Questions</Button>
            )}
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default DisplayExam;
