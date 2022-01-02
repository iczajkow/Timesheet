export enum WorkDayStatus {
  Worked = "Worked",
  Holiday = "Holiday",
}

export interface CalendarView {
  month: number;
  year: number;
}

export type WorkdaysState = Record<string, WorkDayStatus>;
