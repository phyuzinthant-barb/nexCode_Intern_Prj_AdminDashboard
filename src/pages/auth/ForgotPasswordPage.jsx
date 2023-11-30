import { Button, Form, Input, message } from "antd";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/auth/authApi";
import { useLocation } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname;
  const [forgotPasswordMutation, {isLoading: Loading}] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      await forgotPasswordMutation(values);
      message.success('Verification code sent successfully!');
      navigate('/sign-in/forgot-password/verify-otp', {
        replace: true,
        state: {email: values.email, previousRoute: currentRoute},
    });
    } catch (error) {
      console.error('Forgot password error:', error);
      message.error('Failed to send verification code. Please try again.');
    }
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="sign-in-form">
      <Form
        className="sign-in"
        layout="vertical"
        name="basic"
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
        <h2 className="sign-in-header">Forgot Password?</h2>
        <p className="forgot-pwd-description">
          Enter your account details below or <Link to="/sign-in">Log In</Link>
        </p>
        <Form.Item
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

        <Form.Item shouldUpdate>
          {({ getFieldsValue }) => {
            const { email } = getFieldsValue(["email"]);
            const isButtonDisabled = !email;

            return (
                <Button
                  className="sign-in-submit-btn"
                  type="primary"
                  htmlType="submit"
                  disabled={isButtonDisabled}>
                  Get Code
                </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
