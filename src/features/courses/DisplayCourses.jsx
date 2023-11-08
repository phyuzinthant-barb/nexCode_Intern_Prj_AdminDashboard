import { Card, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Courses.css";

const DisplayCourses = () => {
  return (
    <Card
      style={{
        width: "1170px",
        margin: "32px 32px 0px 32px",
        borderRadius: "2px",
      }}>

      <div className="course-card">
        <div className="title">
          <h4>UI</h4>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem repellendus accusamus ut quibusdam atque fuga mollitia blanditiis vitae, libero accusantium amet distinctio enim, magni culpa illo dignissimos explicabo ratione exercitationem!</p>
        </div>

        <div className="action">
          <Space size="middle">
            <Link to='editCourse'>
            <Button type="primary">
              <EditOutlined />
            </Button>
            </Link>
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Space>
        </div>

      </div>
    </Card>
  );
};

export default DisplayCourses;
