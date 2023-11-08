import { Input } from "antd";
const { Search } = Input;

const SearchCourses = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <span className="searchbox">
      <Search
        placeholder="Search Course"
        allowClear
        onSearch={onSearch}
        size="medium"
        bordered="false"
      />
    </span>
  );
};

export default SearchCourses;
