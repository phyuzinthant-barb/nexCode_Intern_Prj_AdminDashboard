import React, { useEffect, useState } from "react";
import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddExam } from "../../features/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEditExamMutation, useGetExamByIdQuery } from "../../features/exams/examApi";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const EditExamPage = () => {
  const { examId } = useParams();
  // console.log(examId);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.authSlice.token);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: examData,
    isLoading,
    refetch,
  } = useGetExamByIdQuery({examId, token});

  const [editExam, {error: editError}] = useEditExamMutation(token);

  useEffect(()=> {
    refetch();
  }, [refetch, token]);

  useEffect(() => {
    if (examData && form) {
      const { name, description, examTotalMark, noOfQuestion, level, category, examDurationMinute } = examData;
      const data = examDurationMinute.toString();
      console.log(typeof data);
      const hours = Math.floor (data/60);
      const minutes = data % 60;

      const formatTime = `${hours}:${minutes}`;

      const format = "HH:mm";
      console.log(dayjs(formatTime, format));


      form.setFieldsValue({
        name,
        description,
        courseId : category?.id,
        examTotalMark,
        noOfQuestion,
        levelId: level.id,
        examDurationMinute: dayjs(formatTime, format),
      });
    }
  }, [examData, form]);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
  
      // Convert time to minutes if it's in HH:mm format
      const totalMinutes =
        dayjs(values?.examDurationMinute).hour() * 60 +
        dayjs(values?.examDurationMinute).minute();
  
      const payload = {
        name: values.name,
        description: values.description,
        examDurationMinute: parseInt(totalMinutes),
        examTotalMark: parseInt(values.examTotalMark),
        noOfQuestion: parseInt(values.noOfQuestion),
        courseId: parseInt(values.courseId),
        levelId: parseInt(values.levelId),
        questions: [], 
      };

      console.log(payload);
      
      const response = await editExam({ examId, updatedData: payload });
  
      if (response.data) {
        message.success("Exam updated successfully.");
        navigate(`/exams/edit-exam/${examId}/edit-question`);
      } else {
        console.error("Error editing exam:", response.error);
        message.error("Error editing exam.");
      }
    } catch (error) {
      console.error("Form validation failed", error);
    }
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
            Edit Exam
          </p>
          <span className="save-button">
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100px", height: "40px", borderRadius: "2px" }}
              loading={isLoading}>
              Next
            </Button>
          </span>
        </div>
        <AddExam />
      </Form>
    </>
  );
};

export default EditExamPage;
