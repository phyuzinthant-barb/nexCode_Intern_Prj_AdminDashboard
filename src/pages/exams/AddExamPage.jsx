import { Button, Form } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddExam } from "../../features/index";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddExamPage = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = () => {
      const values = form.getFieldsValue();
      const time = values?.time.format("HH:mm")
      delete values.time;
      if (!Object.values(values).includes(undefined)) {
       return  navigate("/exams/addExam/addQuestion", {state : {...values, time}});
      }
  };

  return (
    <>
      <div className="add-page-header">
        <p className="header">
          <Link to="/exams" className="arrow-icon">
            <ArrowLeftOutlined />
          </Link>
          Add New Exam
        </p>
        <span className="save-button">
          <Button
            onClick={() => {
              form.submit();
              onFinish();
            }}
            htmlType="submit"
            type="primary"
            style={{ width: "100px", height: "40px", borderRadius: "2px" }}>
            Next
          </Button>
        </span>
      </div>
      <span>
        <AddExam formRef={ref} onFinish={onFinish} form={form} />
      </span>
    </>
  );
};

export default AddExamPage;
