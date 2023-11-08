import { Button, Form } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddQuestion } from "../../features/index";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExamHeader } from "../../components";

const AddQuestionPage = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue();
    if (!Object.values(values).includes(undefined)) {
      return navigate("/exams");
    }
  };

  return (
    <>
      <div className="add-page-header">
        <div className="header">
          <Link to="/exams/addExam" className="arrow-icon">
            <ArrowLeftOutlined />
          </Link>
          <ExamHeader />
        </div>
        <span className="save-button">
          <Button
            onClick={() => {
              form.submit();
              onFinish();
            }}
            htmlType="submit"
            type="primary"
            style={{ width: "100px", height: "40px", borderRadius: "2px" }}>
            Save
          </Button>
        </span>
      </div>
      <span>
        <AddQuestion formRef={ref} onFinish={onFinish} form={form} />
      </span>
    </>
  );
};

export default AddQuestionPage;
