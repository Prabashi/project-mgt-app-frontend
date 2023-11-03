import { Button } from "@mui/material";
import "../../styles/app.scss";

interface AddButtonProps {
  text: string;
  onClickAction: () => void;
}

const AddButton = ({ text, onClickAction }: AddButtonProps) => {
  return (
    <>
      <Button
        className="add-button"
        onClick={() => {
          onClickAction();
        }}
      >
        {text}
      </Button>
    </>
  );
};

export default AddButton;
