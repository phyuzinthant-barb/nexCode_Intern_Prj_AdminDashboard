import React, { useState, useEffect } from "react";
import { Pie, measureTextWidth } from "@ant-design/plots";
import {
  useGetCourseReportPieChartQuery,
  useGetOverallReportQuery,
} from "./reportApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ReportPieChart = () => {
  const {courseId} = useParams();
  console.log(courseId);
  const token = useSelector((state) => state.authSlice.token);

  const {
    data: courseReportData,
    isLoading: courseReportLoading,
    error: courseReportError,
  } = useGetCourseReportPieChartQuery({ courseId, token });

  console.log("API Response:", courseReportData); // Log the raw API response

  console.log("isLoading:", courseReportLoading);
  console.log("error:", courseReportError);

  if (!courseReportData || courseReportData.length === 0) {
    return (
      <div className="no-exams-placeholder">
        <p>No exams available for this course.</p>
      </div>
    );
  }

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    );
    const R = containerWidth / 2;

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : "inherit"
    };">${text}</div>`;
  }

  console.log(courseReportData);

  const data = courseReportData
    ? courseReportData.map((course) => ({
        type: course.levelName,
        value: course.noOfExams,
      }))
    : [];

  const config = {
    appendPadding: 6,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `Total Student ${v}`,
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
      },
      autoRotate: false,
      content: "{value}",
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : "Exams";
          return renderStatistic(d, text, {
            fontSize: 16,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: "16px",
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? `${datum.value}`
            : ``;
          return renderStatistic(width, text, {
            fontSize: 16,
            textAlign: "center"
          });
        },
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      // {
      //   type: "pie-statistic-active",
      // },
    ],
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
