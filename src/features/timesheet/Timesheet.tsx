import { Modal } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TimesheetCalendar from "./components/TimesheetCalendar";
import { closeModal, openModal, selectModalOpened } from "./timesheetSlice";

const Timesheet = () => {
  const modalOpen = useAppSelector(selectModalOpened);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(openModal())}></button>
      <TimesheetCalendar />
      <Modal
        visible={modalOpen}
        onCancel={() => dispatch(closeModal())}
      ></Modal>
    </div>
  );
};

export default Timesheet;
