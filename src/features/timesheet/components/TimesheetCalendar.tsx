import React from "react";
import { Calendar } from "antd";
import styles from "./TimesheetCalendar.module.css";
import DateCell from "./DateCell";
import { WorkdaysState } from "../model";

const TimesheetCalendar: React.FC<{
  workdays: WorkdaysState;
  onDayTrigger: (date: moment.Moment) => void;
}> = ({ workdays, onDayTrigger }) => {
  const dateCellRender = DateCell({ workdays, onDayTrigger });

  return (
    <div className={styles.calendarWrapper}>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default TimesheetCalendar;
