import { AppThunk, RootState } from "./../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkdaysState, WorkDayStatus } from "./model";
import timesheetService from "./timesheetService";
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

export const loadWorkdays = (): AppThunk => (dispatch) => {
  const workdays = timesheetService.readWorkdays();
  dispatch(setWorkdays(workdays));
};

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
    timesheetService.saveWorkdays(workdays);
    dispatch(setWorkdays(workdays));
  };

export default timesheetSlice.reducer;
