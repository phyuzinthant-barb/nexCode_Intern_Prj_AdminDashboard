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

  // const [addNewCourse] = useAddNewCourseMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const onFinish = async (values) => {
  //   try {
  //     setIsSubmitting(true);
  //     const {data, error} = await addNewCourseMutation ({
  //       courseData: values,
  //     });
  //     if (data) {
  //       message.success("Course added successfully");
  //       navigate("/courses")
  //     } else {
  //       message.error(error.data);
  //       setIsSubmitting(false);
  //     }
  //   }catch(error) {
  //     console.error ("Error adding course: ", error)
  //   }
  // }

  const [addNewCourse] = useAddNewCourseMutation(token);
  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const { data, error } = await addNewCourse({
        courseData: values, 
      });
      if (data) {
        dispatch(message.success("Course created successfully."));
        navigate("/courses");
      } else {
        setIsSubmitting(false);
        message.error("Course creation failed.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
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
