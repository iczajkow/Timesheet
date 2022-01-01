import { AppThunk, RootState } from "./../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkdaysState, WorkDayStatus } from "./model";
export interface TimesheetState {
  workdays: WorkdaysState;
}

const initialState: TimesheetState = {
  workdays: {},
};

export const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    setWorkdays: (state, action: PayloadAction<WorkdaysState>) => {
      state.workdays = action.payload;
    },
  },
});

export const selectWorkdays = (state: RootState) => state.timesheet.workdays;
export const { setWorkdays } = timesheetSlice.actions;

export const triggerDay =
  (day: moment.Moment): AppThunk =>
  (dispatch, getState) => {
    let workdays = selectWorkdays(getState());
    const key = day.format("YYYY-MM-DD");
    const dayState = workdays[key];
    if (dayState === WorkDayStatus.Worked) {
      workdays = { ...workdays, [key]: WorkDayStatus.Holiday };
    } else {
      workdays = { ...workdays, [key]: WorkDayStatus.Worked };
    }
    dispatch(setWorkdays(workdays));
  };

export default timesheetSlice.reducer;
