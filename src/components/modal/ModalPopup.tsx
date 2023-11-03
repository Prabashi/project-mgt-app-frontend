import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "../../styles/app.scss";

interface ModalPopupProps {
  title: string;
  // open: boolean
  classNames?: string;
  children: React.ReactNode;
}

export default function ModalPopup({
  title,
  classNames,
  children,
}: ModalPopupProps) {
  return (
    <>
      <Modal
        open={true}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        className="modal"
      >
        <Fade in={true}>
          <Paper square className={"modal-paper " + classNames}>
            <Typography variant="h5" display="block" gutterBottom>
              {title}
            </Typography>
            {children}
          </Paper>
        </Fade>

        {/* <Box sx={style}> */}
        {/* </Box> */}
      </Modal>
    </>
  );
}
