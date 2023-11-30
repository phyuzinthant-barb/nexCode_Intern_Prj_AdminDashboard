import { Input } from "antd";
import { useState } from "react";

const { Search } = Input;

const SearchCourses = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <span className="searchbox">
      <Search
        placeholder="Search Course"
        allowClear
        onSearch={handleSearch}
        size="medium"
      />
    </span>
  );
};

export default SearchCourses;
