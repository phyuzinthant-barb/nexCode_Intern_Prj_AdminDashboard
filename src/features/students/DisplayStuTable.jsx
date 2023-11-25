import { Table, Space, Modal, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../styles/Students.css";
import { Link } from "react-router-dom";
import { useGetAllStudentsQuery, useDeleteStudentMutation } from "./studentApi";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useGetStudentsByCourseIdQuery } from "../courses/courseApi";

const StudentTable = ({ selectedCourseId }) => {
  const token = useSelector((state) => state.authSlice.token);
  const {
    data: studentsData,
    isLoading: isLoadingAllStudents,
    refetch: refetchAllStudents,
  } = useGetAllStudentsQuery(token);

  useEffect(() => {
    console.log("course id", selectedCourseId);
    // if (selectedCourseId) {
      // const {
      //   data: studentsByCourse,
      //   isLoading: isLoadingByCourse,
      //   refetch: refetchByCourse,
      // } = useGetStudentsByCourseIdQuery(selectedCourseId, token);
    // }
  }, [selectedCourseId]);

  const {
    data: studentsByCourse,
    isLoading: isLoadingByCourse,
    refetch: refetchByCourse,
  } = useGetStudentsByCourseIdQuery(selectedCourseId, token);

  console.log("student data", studentsByCourse);

  const { mutate: deleteStudent } = useDeleteStudentMutation(token);

  const handleDeleteStudent = (studentId) => {
    deleteStudent(studentId);
  };

  useEffect(() => {
    refetchAllStudents();
    // refetchByCourse();
  }, [refetchAllStudents, token]);

  const isLoading = isLoadingAllStudents;

  const fixedColors = ["geekblue", "green", "red", "yellow", "purple"];

  const getColorByIndex = (index) => {
    if (index < fixedColors.length) {
      return fixedColors[index];
    } else {
      const dynamicColorIndex = index - fixedColors.length;
      return getDynamicColor(dynamicColorIndex);
    }
  };

  const getDynamicColor = (dynamicColorIndex) => {
    const antdColors = ["cyan", "magenta", "gold", "volcano", "purple"];
    return antdColors[dynamicColorIndex % antdColors.length];
  };

  const courseColorMap = useMemo(() => {
    const uniqueCourses = new Set(
      (studentsData || []).flatMap((item) =>
        item.courses.map((course) => course.id)
      )
    );
    const colorMap = {};
    Array.from(uniqueCourses).forEach((courseId, index) => {
      colorMap[courseId] = getColorByIndex(index);
    });
    return colorMap;
  }, [studentsData]);

  const dataWithSerialNumbers = (studentsData || []).map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));

  const { confirm } = Modal;

  const handleClick = () => {
    confirm({
      title: "Are you sure delete this student?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Student ID",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (text, record) => {
        return (
          <Link
            to={{
              pathname: `/reports/studentReport/${record.rollNo}`,
              state: { ...record },
            }}>
            {text}
          </Link>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md"],
    },
    {
      title: "Courses",
      dataIndex: "courses",
      key: "courses",
      responsive: ["md"],
      render: (_, stu) => (
        <>
          {stu?.courses.map((course, index) => (
            <Tag color={courseColorMap[course.id]} key={index}>
              {course.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/stu-dashboard/edit-student/${record.id}`}>
            <Button type="primary">
              <EditOutlined />
            </Button>
          </Link>
          <Button type="primary" onClick={handleClick} danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="student-table">
      {isLoading ? (
        <div className="loading">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        </div>
      ) : (
        <Table
          dataSource={dataWithSerialNumbers}
          columns={columns}
          rowKey="rollNo"
        />
      )}
    </div>
  );
};

export default StudentTable;
