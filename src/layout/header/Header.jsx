import { Layout, Dropdown, Space, Avatar } from "antd";
import {
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./Header.css";

const { Header } = Layout;

const App = () => {
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
        <a>
          <LogoutOutlined /> Log out
        </a>
      ),
      key: "1",
    },
  ];

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
    </Layout>
  );
};

export default App;
