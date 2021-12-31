import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timesheetReducer from '../features/timesheet/timesheetSlice';

export const store = configureStore({
  reducer: {
    timesheet: timesheetReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
