import React from "react";
import { Calendar } from "antd";
import styles from './TimesheetCalendar.module.css';

const TimesheetCalendar = () => {
  return (
    <div className={styles.calendarWrapper}>
      <Calendar />
    </div>
  );
};

export default TimesheetCalendar;
