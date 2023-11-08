import { Pie } from "@ant-design/plots";
import './reports.css';

const ReportPieChart = ({ selectedValue }) => {

  const generatePieChartData = (selectedValue) => {
    if (selectedValue === "Overall Course Report") {
      return [
        {
          type: "Java-Programming",
          value: 20,
        },
        {
          type: "React JS",
          value: 15,
        },
        {
          type: "UI",
          value: 22,
        },
        {
          type: "UX",
          value: 25,
        },
      ];
    } else if (selectedValue === "Java-Programming") {
      return [
        {
          type: "Basic",
          value: 3,
        },
        {
          type: "Intermediate",
          value: 2,
        },
        {
          type: "Advanced",
          value: 4,
        },
      ];
    } else if (selectedValue === "UI") {
      return [
        {
          type: "Basic",
          value: 2,
        },
        {
          type: "Intermediate",
          value: 7,
        },
        {
          type: "Advanced",
          value: 1,
        },
      ];
    } else if (selectedValue === "UX") {
      return [
        {
          type: "Basic",
          value: 6,
        },
        {
          type: "Intermediate",
          value: 3,
        },
        {
          type: "Advanced",
          value: 2,
        },
      ];
    } else if (selectedValue === "React JS") {
      return [
        {
          type: "Basic",
          value: 6,
        },
        {
          type: "Intermediate",
          value: 3,
        },
        {
          type: "Advanced",
          value: 3,
        },
      ];
    }
    return [];
  };

  const data = generatePieChartData(selectedValue);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v}`,
      },
    },
    // ... (rest of the config remains the same)
  };

  return (
    <>
    <div className="piechart-report">
      <Pie {...config} />
    </div>
    </>
  );
};

export default ReportPieChart;
