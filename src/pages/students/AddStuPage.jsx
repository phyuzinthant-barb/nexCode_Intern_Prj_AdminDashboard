import { Button, message, Form } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AddStu } from "../../features/index";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddNewStudentMutation } from "../../features/students/studentApi";
import { useSelector } from "react-redux";

const AddStuPage = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.authSlice.token);

  const [addNewStudentMutation] = useAddNewStudentMutation(token);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const { data, error } = await addNewStudentMutation({
        studentData: values,
      });
      if (error.originalStatus === 201) {
        message.success("Student added successfully");
        navigate("/stu-dashboard");
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

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  return (
    <>
      <Form
        form={form}
        name="student-form"
        validateMessages={validateMessages}
        onFinish={onFinish}
        autoComplete="off"
        className="form-wrapper">
        <div className="add-page-header">
          <p className="header">
            <Link to="/stu-dashboard" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            Add New Student
          </p>
          <span className="save-button">
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100px", height: "40px", borderRadius: "2px" }}
              loading={isSubmitting}>
              Save
            </Button>
          </span>
        </div>
        <AddStu />
      </Form>
    </>
  );
};

export default AddStuPage;
