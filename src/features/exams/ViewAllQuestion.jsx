import { Button, Card, Form, Input, Select, FloatButton } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;

const ViewAllQuestions = ({ form, questions }) => {
  const examData = useLocation().state;
  const [selectedOption, setSelectedOption] = useState();

  const handleCorrectAnswer = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="add-question-container">
      <Form.List name="items">
        {(fields) => (
          <div className="add-question-form-list">
            {fields.map((field, index) => (
              <Card
                className="question-card"
                size="middle"
                title={`Question ${index + 1}`}
                key={field.key}
              >
                {questions[index] && (
                  <>
                    <Form.Item
                      className="question-textarea"
                      label="Question"
                      name={[field.name, "question"]}
                      initialValue={questions[index].question}
                      rules={[
                        {
                          required: true,
                          message: "Please input the question!",
                        },
                      ]}
                    >
                      <TextArea rows={1} />
                    </Form.Item>

                    {questions[index].answers.map((answer, answerIndex) => (
                      <Form.Item
                        className="question-textarea"
                        label={`Option ${answerIndex + 1}`}
                        name={[field.name, `option${answerIndex + 1}`]}
                        initialValue={answer.answer}
                        rules={[
                          {
                            required: true,
                            message: `Please input the answer option ${answerIndex + 1}!`,
                          },
                        ]}
                        key={answerIndex}
                      >
                        <TextArea rows={1} />
                      </Form.Item>
                    ))}

                    <Form.Item
                      label="Correct Answer"
                      className="correct-ans-selector"
                      name={[field.name, "correctAnswer"]}
                      initialValue={selectedOption}
                      rules={[
                        {
                          required: true,
                          message: "Please choose the correct answer!",
                        },
                      ]}
                    >
                      <Select
                        value={selectedOption}
                        onChange={handleCorrectAnswer}
                        options={questions[index].answers.map((answer, answerIndex) => ({
                          value: `option${answerIndex + 1}`,
                          label: `Option ${answerIndex + 1}`,
                        }))}
                      />
                    </Form.Item>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </Form.List>
      <FloatButton.BackTop />
    </div>
  );
};

export default ViewAllQuestions;
