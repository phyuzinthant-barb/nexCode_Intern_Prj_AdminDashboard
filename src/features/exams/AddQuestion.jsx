import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, FloatButton } from "antd";
import { useState } from "react";

const { TextArea } = Input;

const AddQuestion = ({ formRef, onFinish, form }) => {

  const [selectedOption, setSelectedOption] = useState();

  const handleCorrectAnswer = (value) => {
    setSelectedOption(value);
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <div className="add-question-container">
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        className="add-question-form"
        name="add-question-form"
        autoComplete="off"
        ref={formRef}
        validateMessages={validateMessages}
        onFinish={onFinish}
        initialValues={{
          items: [{}],
        }}>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div className="add-question-form-list">
              {fields.map((field) => (
                <Card
                  className="question-card"
                  size="middle"
                  title={`Question ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }>
                  <Form.Item
                    className="question-textarea"
                    label="Question"
                    name={[field.name, "question"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the question!",
                      },
                    ]}>
                    <TextArea rows={1} />
                  </Form.Item>

                  <Form.Item
                    className="question-textarea"
                    label="Option 1"
                    name={[field.name, "optionOne"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the answer option 1!",
                      },
                    ]}>
                    <TextArea rows={1} />
                  </Form.Item>

                  <Form.Item
                    className="question-textarea"
                    label="Option 2"
                    name={[field.name, "optionTwo"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the answer option 2!",
                      },
                    ]}>
                    <TextArea rows={1} />
                  </Form.Item>

                  <Form.Item
                    className="question-textarea"
                    label="Option 3"
                    name={[field.name, "optionThree"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the answer option 3!",
                      },
                    ]}>
                    <TextArea rows={1} />
                  </Form.Item>

                  <Form.Item
                    className="question-textarea"
                    label="Option 4"
                    name={[field.name, "optionFour"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the answer option 4!",
                      },
                    ]}>
                    <TextArea rows={1} />
                  </Form.Item>

                  <Form.Item
                    label="Correct Answer"
                    className="correct-ans-selector"
                    name={[field.name, "correctAnswer"]}
                    rules={[
                      {
                        required: true,
                        message: "Please choose the correct answer!",
                      },
                    ]}>
                    <Select
                      value={selectedOption}
                      onChange={handleCorrectAnswer}
                      options={[
                        {
                          value: "Option 1",
                          label: "Option 1",
                        },
                        {
                          value: "Option 2",
                          label: "Option 2",
                        },
                        {
                          value: "Option 3",
                          label: "Option 3",
                        },
                        {
                          value: "Option 4",
                          label: "Option 4",
                        },
                      ]}
                    />
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                Add Question
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
      <FloatButton.BackTop />
    </div>
  );
};

export default AddQuestion;
