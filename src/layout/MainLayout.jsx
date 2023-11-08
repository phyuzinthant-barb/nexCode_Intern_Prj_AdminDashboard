import Header from "./header/Header";
import Sidebar from "./sider/Sidebar";

const MainLayout = () => {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
    </div>
  );
};

export default MainLayout;
