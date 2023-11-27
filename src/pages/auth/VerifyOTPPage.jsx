import { Button, Form } from "antd";
import "../styles/auth.css";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useState } from "react";

const App = () => {
  const navigate = useNavigate();
  // const { email, previousRoute } = useLocation().state;
  const [otp, setOtp] = useState("");
  // const [isResent, setIsResent] = useState(false);
  // const [timer, setTimer] = useState(59);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/sign-in/forgot-password/verify-otp/change-password");
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
        <h2 className="sign-in-header">Verfiy your account</h2>
        <p className="forgot-pwd-description">
          Enter the 6-digit PIN code sent to your email ****@mail.com
        </p>
        <Form.Item>
          <OTPInput
            value={otp}
            onChange={(code) => setOtp(code)}
            numInputs={6}
            // inputType={"number"}
            containerStyle={"otp-form"}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus={true}
          />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => {
            const isButtonDisabled = otp.length !== 6;

            return (
              <div>
                <Button
                  className="sign-in-submit-btn"
                  type="primary"
                  htmlType="submit"
                  disabled={isButtonDisabled}>
                  Verify
                </Button>
                <div className="otp-resent">
                  <a href="">Resent new code</a>
                </div>
              </div>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
