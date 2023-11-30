import { Button, Form, Input } from "antd";
import "../styles/auth.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetNewPasswordMutation } from "../../features/auth/user/userApi";

const App = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const email = useLocation().state;
  const [setNewPassword] = useSetNewPasswordMutation();

  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const updatedPws = {
        email,
        newpassword: values.newpassword,
      };
      const { data, error } = await setNewPassword(updatedPws);
      if (error.originalStatus === 200) {
        message.success("Password changed successfully");
        navigate("/sign-in");
      } else {
        message.error(error.data);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    const { newpassword, confirmPassword } = allValues;

    if (newpassword && confirmPassword && newpassword !== confirmPassword) {
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
            {
              pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                  "Your password must have minimum eight characters with at least one uppercase letter, one number and one special character.",
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
            {
              pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                  "Password must have minimum eight characters with at least one uppercase letter, one number and one special character.",
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
