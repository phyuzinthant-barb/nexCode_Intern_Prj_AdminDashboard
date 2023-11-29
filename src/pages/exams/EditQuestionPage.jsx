import React, { useRef, useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddQuestion } from "../../features/index";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAllQuestionQuery, useEditQuestionMutation } from "../../features/exams/examApi";
import { useSelector } from "react-redux";

const EditQuestionPage = () => {
  const ref = useRef();
  const examId = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.authSlice.token);
  const location = useLocation();
  const examData = location.state;

  const { data: questionsData, isLoading, refetch } = useGetAllQuestionQuery({examId, token});
  const [editQuestion, { error: editQuestionError }] = useEditQuestionMutation(token);

  console.log(questionsData);

  useEffect(() => {
    if (questionsData) {
      const items = questionsData.map((question, index) => ({
        question: question.question,
        optionOne: question.answers[0]?.answer,
        optionTwo: question.answers[1]?.answer,
        optionThree: question.answers[2]?.answer,
        optionFour: question.answers[3]?.answer,
        correctAnswer: question.answers.find((answer) => answer.correctAnswer)?.answer,
      }));

      form.setFieldsValue({ items });
    }
  }, [questionsData, form]);

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

    try {
      const response = await editQuestion({ examId: examData.id, updatedData: payload });

      if (response?.originalStatus === 200) {
        message.success("Questions updated successfully.");
        navigate("/exams");
      } else {
        console.error("Error updating questions:", response.error);
        message.error("Error updating questions.");
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
      >
        <div className="add-page-header">
          <div className="header">
            <Link to="/exams/addExam" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            Edit Questions
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

export default EditQuestionPage;
