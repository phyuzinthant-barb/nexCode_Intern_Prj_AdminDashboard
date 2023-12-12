import {
  Layout,
  Dropdown,
  Space,
  Avatar,
  Modal,
  Form,
  Input,
  Button,
} from "antd";
import {
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { useState } from "react";
import { logoutAccount } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../features/auth/user/userApi";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Header } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authSlice.token);
  const [changePassword, { error: error }] = useChangePasswordMutation(token);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [currentNewPasswordSame, setCurrentNewPasswordSame] = useState(true);

  const LogoutModalForm = ({ visible, handleOk, handleCancel }) => (
    <div className="logoutModalForm" >
      <Modal
        title="Are you sure to logout?"
        showIcon
        open={visible}
        okType="danger"
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        okText="Log Out"
        icon={<ExclamationCircleOutlined/>}></Modal>
    </div>
  );

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleFormSubmission = async (values) => {
    setPasswordsMatch(true);
    setCurrentNewPasswordSame(true);

    if (values["new-password"] !== values["confirm-password"]) {
      setPasswordsMatch(false);
      return;
    }

    if (values["current-password"] === values["new-password"]) {
      setCurrentNewPasswordSame(false);
      return;
    }

    try {
      await changePassword({
        password: {
          oldPassword: values["current-password"],
          newPassword: values["new-password"],
        },
      });
      message.success("Password changed successfully.");
      navigate("/sign-in");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const ChangePwdModalForm = ({ visible, handleOk, handleCancel }) => (
    <div className="form-modal">
      <Modal
        className="form-modal"
        centered
        open={visible}
        onOk={handleOk}
        okText="Save Changes"
        onCancel={handleCancel}
        title={<div style={{ color: '#002766', fontSize: '20px' }}>Change Password</div>}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="change-password-form">
          <Form
            className="pwd-form"
            layout="vertical"
            name="chg-pw"
            onFinish={handleFormSubmission}
            labelCol={{
              span: 16,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 400,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off">
            <Form.Item
              label="Current Password"
              name="current-password"
              rules={[
                {
                  required: true,
                  message: "Please input the current password!",
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="new-password"
              rules={[
                {
                  required: true,
                  message: "Please input the new password!",
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
              name="confirm-password"
              rules={[
                {
                  required: true,
                  message: "Please input the confirm password!",
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
          </Form>
        </div>
      </Modal>
    </div>
  );

  const items = [
    {
      label: (
        <a onClick={() => setOpenModal(true)}>
          <EditOutlined /> Change Password
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a onClick={() => setLogoutModalVisible(true)}>
          <LogoutOutlined /> Log out
        </a>
      ),
      key: "1",
    },
  ];

  const handleLogoutModalClose = () => {
    dispatch(logoutAccount());
    navigate("/sign-in", { replace: true });
  };

  const handleLogoutModalCancel = () => {
    setLogoutModalVisible(false);
  };

  const handleOkChangePwd = () => {
    setOpenModal(false);
    dispatch(logoutAccount());
    handleFormSubmission();
  };

  const handleCancelChangePwd = () => {
    setOpenModal(false);
    navigate("/stu-dashboard");
  };

  return (
    <Layout>
      <Header>
        <h2 className="logo">
          <span className="e">e</span>
          <span className="d">d</span>
          <span className="u">u</span>
          <span className="z">z</span>
          <span className="o">o</span>
          <span className="n">n</span>
          <span className="ee">e</span>
        </h2>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          placement="bottomRight"
          arrow>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar icon={<UserOutlined />} />
              Admin
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
      <LogoutModalForm
        visible={logoutModalVisible}
        handleOk={handleLogoutModalClose}
        handleCancel={handleLogoutModalCancel}
      />
      <ChangePwdModalForm
        visible={openModal}
        handleOk={handleOkChangePwd}
        handleCancel={handleCancelChangePwd}
      />
    </Layout>
  );
};

export default App;
