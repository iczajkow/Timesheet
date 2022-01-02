import React from "react";
import { Calendar } from "antd";
import styles from "./TimesheetCalendar.module.css";
import DateCell from "./DateCell";
import { WorkdaysState } from "../model";

const TimesheetCalendar: React.FC<{
  workdays: WorkdaysState;
  onDayTrigger: (date: moment.Moment) => void;
  onDateChange: (date: moment.Moment) => void;
}> = ({ workdays, onDayTrigger, onDateChange }) => {
  const dateCellRender = DateCell({ workdays, onDayTrigger });

  const handleDateChange = (value: moment.Moment) => {
    onDateChange(value);
  };

  return (
    <div className={styles.calendarWrapper}>
      <Calendar onChange={handleDateChange} dateCellRender={dateCellRender} />
    </div>
  );
};

export default TimesheetCalendar;
