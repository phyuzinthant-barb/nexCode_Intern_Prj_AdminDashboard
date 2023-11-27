import { Layout, Dropdown, Space, Avatar, Modal } from "antd";
import {
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { useState } from "react";
import { logoutAccount } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutModalForm = ({ visible, handleOk, handleCancel }) => (
    <Modal title="Are you sure to logout?" open={visible} onOk={handleOk} onCancel={handleCancel}>
    </Modal>
  );

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const items = [
    {
      label: (
        <a>
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
    navigate("/sign-in", {replace: true});
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
        handleCancel={handleLogoutModalClose}
      />
    </Layout>
  );
};

export default App;
