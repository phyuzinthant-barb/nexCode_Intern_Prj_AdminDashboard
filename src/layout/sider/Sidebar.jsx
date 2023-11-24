import { Layout, Menu } from "antd";
import {
  Diversity3,
  Feed,
  LibraryBooks,
  Assignment,
} from "@mui/icons-material";
import "./Sidebar.css";
import { Outlet, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = (obj) => {
    navigate(obj.key);
  };

  return (
    <Layout hasSider>
      <Sider
        className="side-bar"
        breakpoint="md"
        collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onClick={handleClick}
          items={[
            {
              key: "stu-dashboard",
              icon: <Diversity3 />,
              label: "Students",
            },
            {
              key: "courses",
              icon: <Feed />,
              label: "Courses",
            },
            {
              key: "exams",
              icon: <LibraryBooks />,
              label: "Exams",
            },
            {
              key: "reports",
              icon: <Assignment />,
              label: "Reports",
            },
          ]}
        />
      </Sider>
      <Content
        style={{
          minHeight: 120,
          width: "100%",
          backgroundColor: "white",
        }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Sidebar;
