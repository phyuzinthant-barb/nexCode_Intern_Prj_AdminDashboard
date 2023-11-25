import { Form, Input } from "antd";

const AddCourse = () => {

  return (
    <div className="course-form-rectangle-box">
          <Form.Item
            label="Course Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the course name!",
              },
            ]}>
            <Input placeholder='Please input the course name.' />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            className="note-input"
            rules={[
              {
                required: true,
                message: "Please input the course description!",
              },
            ]}>
            <Input.TextArea placeholder="Please input the course description." />
          </Form.Item>
      </div>
  );
};

export default AddCourse;
