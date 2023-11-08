import { CreateStuBtn, FilterStu, SearchStu, DisplayStuTable } from "../../features/index";
import { Link } from "react-router-dom";
import "./StudentPage.css";

const StudentPage = () => {
  return (
    <>
      <div className="top-level">
        <h3 className="header">Students</h3>
        <Link to="addStu">
          <CreateStuBtn />
        </Link>
      </div>
      <div className="functionBlock">
        <FilterStu />
        <SearchStu />
      </div>
      <div className="stuTable">
        <DisplayStuTable />
      </div>
    </>
  );
};

export default StudentPage;
