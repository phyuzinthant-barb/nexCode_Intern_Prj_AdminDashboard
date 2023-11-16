import { Button, Form, Input } from "antd";
import "../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/sign-in");
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChange = (changedValues, allValues) => {
    const { newPassword, confirmPassword } = allValues;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setIsPasswordMismatch(true);
    } else {
      setIsPasswordMismatch(false);
    }
  };

  return (
    <div className="sign-in-form">
      <Form
        form={form}
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
        autoComplete="off"
        onValuesChange={onValuesChange}>
        <h2 className="sign-in-header">Change Password</h2>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              message: "Please input your new password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              message: "Please input your confirm password!",
            },
          ]}
          validateStatus={isPasswordMismatch ? "error" : ""}
          help={isPasswordMismatch && "Passwords do not match."}>
          <Input.Password />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => {
            const { newPassword, confirmPassword } = form.getFieldsValue([
              "newPassword",
              "confirmPassword",
            ]);
            const isButtonDisabled =
              !newPassword || !confirmPassword || isPasswordMismatch;

            return (
              <Button
                className="sign-in-submit-btn"
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled}>
                Confirm
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
