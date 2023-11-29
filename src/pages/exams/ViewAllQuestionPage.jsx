import React, { useRef, useState } from "react";
import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ViewAllQuestion } from "../../features/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAddNewExamMutation } from "../../features/exams/examApi";
import { useSelector } from "react-redux";

const ViewAllQuestionsPage = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.authSlice.token);

  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        className="add-question-form"
        name="add-question-form"
        autoComplete="off"
        validateMessages={validateMessages}
        initialValues={{
          items: [{}],
        }}
      >
        <div className="add-page-header">
          <div className="header">
            <Link to="/exams/addExam" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            All Questions
          </div>
          <span className="save-button">
            <Button
              htmlType="submit"
              type="primary"
              style={{
                width: "100px",
                height: "40px",
                borderRadius: "2px",
              }}
            >
              Done
            </Button>
          </span>
        </div>
        <ViewAllQuestion form={form} />
      </Form>
    </>
  );
};

export default ViewAllQuestionsPage;
