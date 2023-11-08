import { Form, Input, Radio, Select, InputNumber, TimePicker } from "antd";
import { useState } from "react";
import "./Exam.css";

const AddExam = ({ formRef, onFinish, form }) => {
  // Validate Message
  const validateMessages = {
    required: "${label} is required!",
  };

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

  //Fixed Options
  const options = [
    {
      value: "Java-Programming",
      label: "Java-Programming",
    },
    {
      value: "UI",
      label: "UI",
    },
    {
      value: "UX",
      label: "UX",
    },
    {
      value: "React JS",
      label: "React JS",
    },
  ];

  //time picker format
  const format = "HH:mm";

  return (
    <div className="exam-form-rectangle-box">
      <div className="exam-form">
        <Form
          form={form}
          name="exam-form"
          ref={formRef}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: "800",
          }}
          validateMessages={validateMessages}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Choose Level"
            name="chooseLvl"
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
            name="chooseCourse"
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
            name="examName"
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
            name="totalQuestions"
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
            name="totalMarks"
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
            name="time"
            className="time-picker"
            rules={[
              {
                required: true,
                message: "Please input the limit of the time!",
              },
            ]}>
            <TimePicker format={format} showNow={false} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddExam;
