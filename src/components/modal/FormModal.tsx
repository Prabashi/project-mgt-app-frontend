import { Grid, CssBaseline } from "@mui/material";
import ModalPopup from "../modal/ModalPopup";
import SubmitButton from "../form/SubmitButton";
import CancelButton from "../form/CancelButton";
import { closeModal } from "../../slices/modalSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";

interface TaskPopupProps {
  // open: boolean;
  //   handleClose: () => void;
  title: string;
  onSubmit: () => void;
  classNames?: string;
  children: React.ReactNode;
}

const FormModal = ({
  title,
  onSubmit,
  classNames,
  children,
}: TaskPopupProps) => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    onSubmit();
    dispatch(closeModal());
    // handleClose();
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {/* <CssBaseline /> */}
      <ModalPopup title={title} classNames={classNames}>
        {children}
        <Grid container justifyContent="space-between" mt={2}>
          <Grid item xs={5}>
            <SubmitButton onClick={handleSubmit} />
          </Grid>
          <Grid item xs={5}>
            <CancelButton onClick={handleClose} />
          </Grid>
        </Grid>
      </ModalPopup>
    </>
  );
};

export default FormModal;
