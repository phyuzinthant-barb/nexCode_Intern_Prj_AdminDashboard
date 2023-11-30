import React from "react";
import { Layout, Menu } from "antd";
import {
  Diversity3,
  Feed,
  LibraryBooks,
  Assignment,
} from "@mui/icons-material";
import "./Sidebar.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (obj) => {
    navigate(obj.key);
  };

  return (
    <Layout hasSider className="side-bar">
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        style={{
          overflow: "auto",
          minHeight: "100vh",
          position: "sticky",
        }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname] || `/stu-dashboard`}
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
