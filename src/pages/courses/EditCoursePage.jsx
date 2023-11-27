import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CourseForm } from "../../features/index";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "../../features/courses/courseApi";

const EditCoursePage = () => {
  const ref = useRef();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authSlice.token);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: courseData,
    isLoading,
    refetch,
  } = useGetCourseByIdQuery({ courseId, token });

  useEffect(() => {
    refetch();
  }, [refetch, token]);

  const [editCourseMutation, { error: editError }] =
    useEditCourseMutation(token);

  useEffect(() => {
    if (courseData && form) {
      const { name, description } = courseData;

      form.setFieldsValue({
        name,
        description,
      });
    }
  }, [courseData, form]);

  const onFinish = async (values) => {
    console.log(values);
    try {
      setIsSubmitting(true);
      const {data, error } = await editCourseMutation({
        courseId,
        updatedData: values,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(data) {
        message.success("Course edited successfully.");
        navigate("/courses")
      } else if (error) {
        message.error("Error editing student");
      }
    }catch(error) {
      console.error ("Edit course error: ", error)
    }
  }

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
        onFinish={onFinish}
        autoComplete="off">
        <div className="add-page-header">
          <p className="header">
            <Link to="/courses" className="arrow-icon">
              <ArrowLeftOutlined />
            </Link>
            Edit Course
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
        <CourseForm />
      </Form>
    </>
  );
};

export default EditCoursePage;
