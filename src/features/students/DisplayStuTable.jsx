import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../styles/Students.css";
import { Link } from "react-router-dom";

const StudentTable = () => {
  // Add All Students API Integration
  const dataSource = [
    {
      key: 1,
      stuId: "stu001",
      name: "Phyu Zin Thant",
      email: "phyuzinthant2008@gmail.com",
      phone: "09-766360776",
      courses: "React JS",
    },
  ];

  const dataWithSerialNumbers = dataSource.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Student ID",
      dataIndex: "stuId",
      key: "stuId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
      console.log(record.name); 
        return (
          <Link
            to={{
              pathname: `/reports/studentReport/${record.stuId}`,
              state: { ...record },
            }}
          >
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
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Link to="/editStu">
            <Button type="primary">
              <EditOutlined />
            </Button>
          </Link>
          <Button type="primary" danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="student-table">
      <Table dataSource={dataWithSerialNumbers} columns={columns} />
    </div>
  );
};

export default StudentTable;
