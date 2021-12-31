import { RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";
export interface TimesheetState {
  modalOpened: boolean;
}

const initialState: TimesheetState = {
  modalOpened: false,
};

export const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalOpened = true;
    },
    closeModal: (state) => {
      state.modalOpened = false;
    },
  },
});

export const selectModalOpened = (state: RootState) =>
  state.timesheet.modalOpened;

export const { openModal, closeModal } = timesheetSlice.actions;

export default timesheetSlice.reducer;
