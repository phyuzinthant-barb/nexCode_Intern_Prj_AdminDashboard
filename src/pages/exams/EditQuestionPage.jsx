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

  const options = ["optionOne", "optionTwo", "optionThree", "optionFour"]

  useEffect(() => {
    refetch();
  }, [refetch, token]);

  useEffect(() => {
    if (questionsData) {
      const items = questionsData.map((question, index) => {
        
        const correctOpt = question?.answers.findIndex((ans) => {
          if(ans.correctAnswer){
            return ans
          }
        });

        return {
        question: question.question,
        optionOne: question.answers[0]?.answer,
        optionTwo: question.answers[1]?.answer,
        optionThree: question.answers[2]?.answer,
        optionFour: question.answers[3]?.answer,
        correctAnswer: options[correctOpt]
      }});

      form.setFieldsValue({ items });
    }
    console.log("useEffect triggered");
  }, [questionsData, form]);

  const onFinish = async (values) => {
    console.log("onFinish called");
    console.log("Form values", values);
    try {
      const values = await form.validateFields();

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

      console.log("Before editQuestion:", examId, questions);

      setIsSubmitting(true);
      const { data, error } = await editQuestion({
        examId: examId,
        updatedData: questions,
      });
      console.log("data", data);

      if (data) {
        message.success("Questions updated successfully.");
        navigate("/exams");
      } else {
        console.error("Error updating questions:", error);
        message.error("data.error");
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
        onFinish={onFinish}>
        <div className="add-page-header">
          <div className="header">
            <Link to="/exams" className="arrow-icon">
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
              loading={isSubmitting}>
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
