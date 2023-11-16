import { Button, Form, Input } from "antd";
import "../styles/auth.css";
import { Link } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const App = () => (
  <div className="sign-in-form">
    <Form
      className="sign-in"
      layout="vertical"
      name="sign-in"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
    
      <h2 className="sign-in-header">Welcome!</h2>
      <Form.Item
        className="sign-in-email"
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "Please input your email!",
          },
        ]}
        hasFeedback>
        <Input />
      </Form.Item>

      <Form.Item
        className="sign-in-email"
        label="Password"
        name="password"
        rules={[
          {
            message: "Please input your password!",
          },
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Link to="/sign-in/forgot-password" className="forgot-pwd" href="">
          Forgot Password
        </Link>
      </Form.Item>

      <Form.Item shouldUpdate>
        {({ getFieldsValue }) => {
          const { email, password } = getFieldsValue(["email", "password"]);
          const isButtonDisabled = !email || !password;

          return (
            <Button
              className="sign-in-submit-btn"
              type="primary"
              htmlType="submit"
              disabled={isButtonDisabled}>
              Log In
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  </div>
);
export default App;
