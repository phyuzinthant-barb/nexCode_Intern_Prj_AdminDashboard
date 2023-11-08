import { Button } from "antd";
import "../styles/Students.css";

const CreateButton = () => {

  return (
    <span>
        <Button className="create" type="primary">
          Add New Student
        </Button>
    </span>
  );
};

export default CreateButton;
