import { Form, Input, Select } from "antd";
import { useGetAllCoursesQuery } from "../courses/courseApi";
import { useSelector } from "react-redux";

const AddStu = () => {
  const token = useSelector((state) => state.authSlice.token);
  const { data: courses, isLoading } = useGetAllCoursesQuery(token);

  const options = courses?.map((course) => ({
    label: course.name,
    value: course.id,
  }));

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="form-rectangle-box">
      <Form.Item
        label="Student Name"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input student name!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input student's email!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input student's phone number!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Courses"
        name="courses"
        rules={[
          {
            required: true,
            message: "Please input the enrolled courses!",
          },
        ]}>
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select the course name"
          onChange={handleChange}
          options={options}
          disabled={isLoading}
        />
      </Form.Item>
    </div>
  );
};

export default AddStu;
