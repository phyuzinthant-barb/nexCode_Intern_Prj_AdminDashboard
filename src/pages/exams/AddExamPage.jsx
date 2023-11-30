import React, { useRef } from "react";
import { Button, Form } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddExam } from "../../features/index";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AddExamPage = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Values", values);

      const totalMinutes =
        dayjs(values?.examDurationMinute).hour() * 60 +
        dayjs(values?.examDurationMinute).minute();
      const payload = {
        ...values,
        noOfQuestion: parseInt(values.noOfQuestion),
        examTotalMark: parseInt(values.examTotalMark),
        examDurationMinute: parseInt(totalMinutes),
      };

      console.log("payload", payload);
      if (!Object.values(values).includes(undefined)) {
        navigate("/exams/addExam/addQuestion", { state: payload });
      }
    } catch (error) {
      console.error("Form validation failed", error);

      if (error.errorFields) {
        error.errorFields.forEach((fieldError) => {
          console.error(`Validation error in field ${fieldError.name}`);
          console.error(`Error message: ${fieldError.errors.join(", ")}`);
        });
      }
    }
  };

  const handleFormSubmit = () => {
    form.submit();
    onFinish();
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
      <Form
        form={form}
        name="exam-form"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          width: "800",
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
        autoComplete="off">
        <div className="add-page-header">
          <p className="header">
            <Link to="/exams" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            Add New Exam
          </p>
          <span className="save-button">
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100px", height: "40px", borderRadius: "2px" }}>
              Next
            </Button>
          </span>
        </div>
        <AddExam />
      </Form>
    </>
  );
};

export default AddExamPage;
