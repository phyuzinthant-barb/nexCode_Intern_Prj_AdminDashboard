import React, { useRef, useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddQuestion } from "../../features/index";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllQuestionQuery,
  useEditQuestionMutation,
} from "../../features/exams/examApi";
import { useSelector } from "react-redux";

const EditQuestionPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.authSlice.token);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: questionsData,
    isLoading,
    refetch,
  } = useGetAllQuestionQuery({ examId, token });

  const [editQuestion, { error: editQuestionError }] = useEditQuestionMutation({
    examId,
    token,
  });

  useEffect(() => {
    refetch();
  }, [refetch, token]);

  useEffect(() => {
    if (questionsData) {
      const items = questionsData.map((question, index) => ({
        question: question.question,
        optionOne: question.answers[0]?.answer,
        optionTwo: question.answers[1]?.answer,
        optionThree: question.answers[2]?.answer,
        optionFour: question.answers[3]?.answer,
        correctAnswer: question.answers.find((answer) => answer.correctAnswer)
          ?.answer,
      }));

      form.setFieldsValue({ items });
    }
    console.log("useEffect triggered");
  }, [questionsData, form]);


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
        disabled
        className="add-question-form"
        name="add-question-form"
        autoComplete="off"
        >
        <div className="add-page-header">
          <div className="header">
            <Link to="/exams" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            View All Questions
          </div>
          <span className="save-button">
          </span>
        </div>
        <AddQuestion form={form} />
      </Form>
    </>
  );
};

export default EditQuestionPage;
