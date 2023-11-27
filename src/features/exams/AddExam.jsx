import { Form, Input, Radio, Select, InputNumber, Space } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../courses/courseApi";
import "../styles/Exam.css";

const AddExam = ({ formRef, onFinish, form }) => {
  const token = useSelector((state) => state.authSlice.token);
  const { data: courses, isLoading } = useGetAllCoursesQuery(token);
  // Validate Message
  

  //Radio Button
  const [value, setValue] = useState("");
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  //Choose Course Select Option
  // Filter `option.label` match the user type `input`
  const onChangeOption = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const options = courses?.map((course) => ({
      label: course.name,
      value: course.id,
    }));

  //time picker format
  const format = "HH:mm";

  return (
    <div className="exam-form-rectangle-box">
      <div className="exam-form">
          <Form.Item
            label="Choose Level"
            name="levelId"
            rules={[
              { required: true, message: "Please input the exam level!" },
            ]}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Basic</Radio>
              <Radio value={2}>Intermediate</Radio>
              <Radio value={3}>Advance</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Choose Course"
            name="courseId"
            className="select-course"
            size="large"
            rules={[
              {
                required: true,
                message: "Please choose the course!",
              },
            ]}>
            <Select
              showSearch
              placeholder="Select the course name"
              optionFilterProp="children"
              onChange={onChangeOption}
              onSearch={onSearch}
              filterOption={filterOption}
              options={options}
            />
          </Form.Item>

          <Form.Item
            label="Exam Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the exam name!",
              },
            ]}>
            <Input placeholder="Please input the exam name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the course description!",
              },
            ]}>
            <Input placeholder="Please input the course description." />
          </Form.Item>

          <Form.Item
            label="Total Questions"
            name="noOfQuestion"
            className="input-number-form"
            rules={[
              {
                type:'number',
                required: true,
                message: "Please input the exam total questions!",
              },
            ]}>
            <InputNumber min={1} max={50} />
          </Form.Item>

          <Form.Item
            label="Total Marks"
            name="examTotalMark"
            className="input-number-form"
            rules={[
              {
                type:'number',
                required: true,
                message: "Please input the exam total marks!",
              },
            ]}>
            <InputNumber min={1} max={100} />
          </Form.Item>

          <Form.Item
            label="Limited Time"
            name="examDurationMinute"
            className="time-picker"
            rules={[
              {
                type: 'object',
                required: true,
                message: "Please input the limit of the time!",
              },
            ]}
          >
            <Space.Compact>
              <Form.Item
                name={['examDurationMinute', 'hours']}
                noStyle
                rules={[{ required: true, message: 'Please input hours!' }]}
              >
                <InputNumber placeholder="Hours" min={0} max={24} />
              </Form.Item>
              <Form.Item
                name={['examDurationMinute', 'minutes']}
                noStyle
                rules={[{ required: true, message: 'Please input minutes!' }]}
              >
                <InputNumber placeholder="Minutes" min={0} max={59} />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
      </div>
    </div>
  );
};

export default AddExam;
