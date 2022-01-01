import { Button } from "antd";
import React from "react";
import { WorkdaysState, WorkDayStatus } from "../model";
import styles from "./DateCell.module.css";

export interface DateCellProps {
  workdays: WorkdaysState;
  onDayTrigger: (date: moment.Moment) => void;
}

const DateCell =
  ({ workdays, onDayTrigger }: DateCellProps) =>
  (value: moment.Moment) => {
    const currentState = workdays[value.format("YYYY-MM-DD")];
    const worked = currentState === WorkDayStatus.Worked;

    return (
      <div>
        <Button
          onClick={() => onDayTrigger(value)}
          className={worked ? styles.cellWorked : styles.cellHoliday}
          type="link"
          size="small"
        >
          {worked ? "Worked" : "Holiday"}
        </Button>
      </div>
    );
  };

export default DateCell;
