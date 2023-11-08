import { Form, Input } from "antd";

const AddStu = ({formRef, onFinish}) => {
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  
  return (
    <div className="form-rectangle-box">
      <div className="student-form">
        <Form
        name="student-form"
        ref={formRef}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: 800,
          }}
          validateMessages={validateMessages}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Student Name"
            name="stuName"
            rules={[
              {
                required: true,
                message: "Please input student name!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input student's email!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input student's phone number!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Courses"
            name="courses"
            rules={[
              {
                required: true,
                message: "Please input the enrolled courses!",
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddStu;
