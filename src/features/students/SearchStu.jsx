import { Input } from "antd";
import "../styles/Students.css";
const { Search } = Input;

const SearchBox = ({ onSearch }) => {

  return (
    <span className="searchbox">
      <Search
        placeholder="Search Student's Email/Roll No"
        allowClear
        onSearch={onSearch}
        size="medium"
        enterButton
        bordered={false}
      />
    </span>
  );
};

export default SearchBox;
