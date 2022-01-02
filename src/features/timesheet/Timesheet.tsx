import { Button } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TimesheetCalendar from "./components/TimesheetCalendar";
import { loadWorkdays, selectWorkdays, triggerDay } from "./timesheetSlice";
import styles from "./Timesheet.module.css";

const Timesheet = () => {
  const workdays = useAppSelector(selectWorkdays);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadWorkdays());
  }, []);

  return (
    <div>
      <TimesheetCalendar
        workdays={workdays}
        onDayTrigger={(value) => dispatch(triggerDay(value))}
      />
      <div className={styles.actionWrapper}>
        <Button type="primary">Generate Timesheet</Button>
      </div>
    </div>
  );
};

export default Timesheet;
