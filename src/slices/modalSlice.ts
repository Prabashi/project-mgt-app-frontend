// modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  openModal: string | null;
  modalProps: Record<string, any> | null; // Store props for each modal
}

const initialState: ModalState = {
  openModal: null,
  modalProps: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalName: string;
        modalProps: Record<string, any>;
      }>
    ) => {
      state.openModal = action.payload.modalName;
      state.modalProps = action.payload.modalProps;
    },
    closeModal: (state) => {
      state.openModal = null;
      state.modalProps = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
