import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TimesheetCalendar from "./components/TimesheetCalendar";
import { selectWorkdays, triggerDay } from "./timesheetSlice";

const Timesheet = () => {
  const workdays = useAppSelector(selectWorkdays);
  const dispatch = useAppDispatch();

  return (
    <div>
      <TimesheetCalendar
        workdays={workdays}
        onDayTrigger={(value) => dispatch(triggerDay(value))}
      />
    </div>
  );
};

export default Timesheet;
