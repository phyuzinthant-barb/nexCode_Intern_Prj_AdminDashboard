import React, { useRef, useEffect, useState } from "react";
import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddStu } from "../../features/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useEditStudentMutation, useGetStudentByIdQuery
} from "../../features/students/studentApi";
import { useSelector } from "react-redux";

const EditStuPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authSlice.token);
  const [form] = Form.useForm();
  const ref = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: studentData,
    isLoading,
    refetch,
  } = useGetStudentByIdQuery({ studentId, token });

  useEffect(() => {
    refetch();
  }, [refetch, token]);

  const [editStudentMutation, { error: editError }] =
    useEditStudentMutation(token);

  useEffect(() => {
    if (studentData && form) {
      const { username, email, phone, courses } = studentData;
      const courseIds = courses.map((course) => course.id);

      form.setFieldsValue({
        username,
        email,
        phone,
        courses: courseIds,
      });
    }
  }, [studentData, form]);

  const onFinish = async (values) => {
    console.log(values)
    const courseIds = studentData.courses
      .filter((course) => {
        return values.courses.includes(course.id)})
      .map((course) => course.id);
  
    try {
      setIsSubmitting(true);
      const { data, error } = await editStudentMutation({
        studentId,
        updatedData: {
          ...values,
        },
      });

      console.log(error);
  
      if (error.originalStatus === 200) {
        navigate("/stu-dashboard");
        message.success("Student's information updated successfully");
      } else {
        message.error("An error occurred while adding the student.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error adding student:", error);

      if (error.response && error.response.status === 409) {
        message.error("Email is already in use. Please use a different email.");
      } else {
        message.error("An error occurred while adding the student.");
      }
    }
  };
  
  
  return (
    <>
      <Form
        form={form}
        name="student-form"
        onFinish={onFinish}
        autoComplete="off"
        className="form-wrapper"
        // initialValues={{}}
      >
        <div className="add-page-header">
          <p className="header">
            <Link to="/stu-dashboard" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            Edit Student
          </p>
          <span className="save-button">
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100px", height: "40px", borderRadius: "2px" }}
              loading={isLoading}>
              Save
            </Button>
          </span>
        </div>
        <AddStu />
      </Form>
    </>
  );
};

export default EditStuPage;
