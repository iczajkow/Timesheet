import { Button } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TimesheetCalendar from "./components/TimesheetCalendar";
import {
  loadWorkdays,
  selectSelectedDate,
  selectWorkdays,
  setSelectedDate,
  triggerDay,
} from "./timesheetSlice";
import styles from "./Timesheet.module.css";
import timesheetCSVGenerator from "./timesheetCSVGenerator";
import moment from "moment";

const Timesheet = () => {
  const workdays = useAppSelector(selectWorkdays);
  const selectedDate = useAppSelector(selectSelectedDate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadWorkdays());
  }, []);

  const handleGenerateTimesheet = () => {
    const from = moment(selectedDate).clone().startOf("month");
    const to = moment(selectedDate).clone().endOf("month");
    console.log({ from: from.format(), to: to.format() });
    const csv = timesheetCSVGenerator.generateCSV(workdays, from, to);
    console.log(csv);
  };

  return (
    <div>
      <TimesheetCalendar
        workdays={workdays}
        onDayTrigger={(value) => dispatch(triggerDay(value))}
        onDateChange={(value) => dispatch(setSelectedDate(value.format()))}
      />
      <div className={styles.actionWrapper}>
        <Button type="primary" onClick={handleGenerateTimesheet}>
          Generate Timesheet
        </Button>
      </div>
    </div>
  );
};

export default Timesheet;
