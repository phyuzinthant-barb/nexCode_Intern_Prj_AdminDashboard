import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CourseForm } from "../../features/index";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddNewCourseMutation } from "../../features/courses/courseApi";

const AddCoursePage = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.authSlice.token);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addNewCourse] = useAddNewCourseMutation(token);
  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const { data, error } = await addNewCourse({
        courseData: { name: values.name, description: values.description },
      });
      console.log(error);
      if (data) {
        message.success("Course created successfully.");
        navigate("/courses");
      } else {
        message.error("Course is already exist.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error adding student:", error);

      if (error && error.status === 409) {
        message.error("Course is already exist.");
      } else {
        message.error("An error occurred while adding the student.");
      }
    }
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
      <Form
        form={form}
        name="course-form"
        style={{
          width: "800",
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
        autoComplete="off">
        <div className="add-page-header">
          <p className="header">
            <Link to="/courses" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            Add New Course
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
        <CourseForm />
      </Form>
    </>
  );
};

export default AddCoursePage;
