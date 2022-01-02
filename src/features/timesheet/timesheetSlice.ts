import { AppThunk, RootState } from "./../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarView, WorkdaysState, WorkDayStatus } from "./model";
import timesheetService from "./timesheetService";
import moment from "moment";
export interface TimesheetState {
  workdays: WorkdaysState;
  selectedDate: string;
}

const initialState: TimesheetState = {
  workdays: {},
  selectedDate: moment().format()
};

export const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    setWorkdays: (state, action: PayloadAction<WorkdaysState>) => {
      state.workdays = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    }
  },
});

export const selectWorkdays = (state: RootState) => state.timesheet.workdays;
export const selectSelectedDate = (state: RootState) => state.timesheet.selectedDate;
export const { setWorkdays, setSelectedDate } = timesheetSlice.actions;

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
