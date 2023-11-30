import React, { useRef, useState } from "react";
import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddQuestion } from "../../features/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ExamHeader } from "../../components";
import { useAddNewExamMutation } from "../../features/exams/examApi";
import { useSelector } from "react-redux";

const AddQuestionPage = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.authSlice.token);

  const [addNewExam] = useAddNewExamMutation();
  const examData = useLocation().state;

  const onFinish = async (values) => {
    const questions = values.items.map((item) => {
      const answer1 = {
        answer: item.optionOne,
        correctAnswer: "optionOne" === item.correctAnswer,
      };
      const answer2 = {
        answer: item.optionTwo,
        correctAnswer: "optionTwo" === item.correctAnswer,
      };
      const answer3 = {
        answer: item.optionThree,
        correctAnswer: "optionThree" === item.correctAnswer,
      };
      const answer4 = {
        answer: item.optionFour,
        correctAnswer: "optionFour" === item.correctAnswer,
      };

      return {
        question: item.question,
        answers: [answer1, answer2, answer3, answer4],
      };
    });

    const payload = { ...examData, questions };
    console.log(payload);

    try {
      const {data,error} = await addNewExam({examData : payload});
      if (data) {
        console.log("New exam added successfully:", data);
        message.success("New exam added successfully.")
        navigate("/exams");
      } else {
        console.error("Error adding a new exam:", response.error);
        message.error("Error adding a new exam.")
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

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
        onFinish={onFinish}
        initialValues={{
          items: [{}],
        }}
      >
        <div className="add-page-header">
          <div className="header">
            <Link to="/exams/addExam" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            <ExamHeader />
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
              Save
            </Button>
          </span>
        </div>
        <AddQuestion form={form} />
      </Form>
    </>
  );
};

export default AddQuestionPage;
