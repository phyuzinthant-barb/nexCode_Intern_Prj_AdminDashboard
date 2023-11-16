import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import "./Auth.css";

const { Header } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ zIndex: 2 }}>
        <h2 className="logo">
          <span className="e">e</span>
          <span className="d">d</span>
          <span className="u">u</span>
          <span className="z">z</span>
          <span className="o">o</span>
          <span className="n">n</span>
          <span className="ee">e</span>
        </h2>
      </Header>
      <Content
        style={{
          width: "100%",
          backgroundColor: "transparent",
          zIndex: 0,
        }}>
        <div className="background-img"></div>
        <div className="front-img"></div>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
