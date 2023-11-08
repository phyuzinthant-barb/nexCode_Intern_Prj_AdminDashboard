import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CourseForm } from "../../features/index";
import { useRef } from "react";
import { Link } from "react-router-dom";

const EditCoursePage = () => {
  const ref = useRef();

  const onFinish = (values) => {
    console.log("Success:", values);
    if (ref.current) {
      ref.current.submit();
    }
  };

  return (
    <>
      <div className="add-page-header">
        <p className="header">
            <Link to="/courses" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
          Edit Course
        </p>
        <span className="save-button">
          <Button
            onClick={onFinish}
            htmlType="submit"
            type="primary"
            style={{ width: "100px", height: "40px", borderRadius: "2px" }}>
            Save
          </Button>
        </span>
      </div>
      <span>
        <CourseForm formRef={ref} onFinish={onFinish} />
      </span>
    </>
  );
};

export default EditCoursePage;
