import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CourseForm } from "../../features/index";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddNewCourseMutation } from "../../features/courses/courseApi";

const AddCoursePage = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = useSelector((state) => state.authSlice.token);

  const [addNewCourseMutation] = useAddNewCourseMutation(token);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const {data, error} = await addNewCourseMutation ({
        courseData : values,
      })
      console.log(values);
      message.success("Course added successfully")
      navigate("/courses");
    }catch(error) {
      console.error ("Error adding course: ", error)
    }
  }

  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
    <Form
    form={form}
          name="course-form"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: '800',
          }}
          validateMessages={validateMessages}
          onFinish={onFinish}
          autoComplete="off">
    {/* <div className="course-form"> */}
      <div className="add-page-header">
        <p className="header">
          <Link to="/courses" className="arrow-icon">
            <ArrowLeftOutlined />
          </Link>
          Add New Course
        </p>
        <span className="save-button">
          <Button
            onClick={onFinish}
            htmlType="submit"
            type="primary"
            style={{ width: "100px", height: "40px", borderRadius: "2px" }}>
            Save
          </Button>
        </span>
      </div>
        <CourseForm  />
      </Form>
    </>
  );
};

export default AddCoursePage;
