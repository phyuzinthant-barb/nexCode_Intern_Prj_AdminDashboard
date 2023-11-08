import { Input } from "antd";
const { Search } = Input;
import "../styles/Students.css";

const SearchBox = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <span className="searchbox">
      <Search
        placeholder="Search Student Name/ ID"
        allowClear
        onSearch={onSearch}
        size="medium"
        bordered="false"
      />
    </span>
  );
};

export default SearchBox;
