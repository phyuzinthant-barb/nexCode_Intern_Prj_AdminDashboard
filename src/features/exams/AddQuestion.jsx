import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, FloatButton } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;

const AddQuestion = ({ form }) => {

  const examData =  useLocation().state;
  // console.log(examData)

  const [selectedOption, setSelectedOption] = useState();

  const handleCorrectAnswer = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="add-question-container">
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
                          value: "optionOne",
                          label: "Option 1",
                        },
                        {
                          value: "optionTwo",
                          label: "Option 2",
                        },
                        {
                          value: "optionThree",
                          label: "Option 3",
                        },
                        {
                          value: "optionFour",
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
      <FloatButton.BackTop />
    </div>
  );
};

export default AddQuestion;
