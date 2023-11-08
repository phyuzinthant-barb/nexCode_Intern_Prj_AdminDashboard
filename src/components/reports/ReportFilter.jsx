import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const ReportFilter = ({ handleSelect, selectedValue }) => {
  const navigate = useNavigate();

  const options = [
    {
      key: 1,
      value: "Java-Programming",
      label: "Java-Programming",
    },
    {
      key: 2,
      value: "UI",
      label: "UI",
    },
    {
      key: 3,
      value: "UX",
      label: "UX",
    },
    {
      key: 4,
      value: "React JS",
      label: "React JS",
    },
    {
      key: 5,
      value: "Overall Course Report",
      label: "Overall Course Report",
    },
  ];

  const handleOptionSelect = (value) => {
    if (value !== "Overall Course Report") {
      const key = options.find((option) => option.value === value)?.key;
      if (key !== undefined) {
        // Navigate to the selected course's report page using the key
        navigate(`/reports/courseReport/${key}`);
      }
    } else {
      handleSelect(value);
    }
  };

  return (
    <Select
      showSearch
      style={{
        width: 200,
      }}
      options={options}
      placeholder="Select Course"
      optionFilterProp="children"
      onSelect={handleOptionSelect}
      value={selectedValue} // Set the selected value to control the default option
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
    />
  );
};

export default ReportFilter;
