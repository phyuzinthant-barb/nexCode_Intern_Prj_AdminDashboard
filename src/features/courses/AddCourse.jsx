import { Form, Input } from "antd";

const AddCourse = ({ formRef, onFinish }) => {
  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <div className="course-form-rectangle-box">
      <div className="course-form">
        <Form
          name="course-form"
          ref={formRef}
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
          <Form.Item
            label="Course Name"
            name="courseName"
            rules={[
              {
                required: true,
                message: "Please input the course name!",
              },
            ]}>
            <Input placeholder='Please input the course name.' />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            className="note-input"
            rules={[
              {
                required: true,
                message: "Please input the course description!",
              },
            ]}>
            <Input.TextArea placeholder="Please input the course description." />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCourse;
