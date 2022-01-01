export enum WorkDayStatus {
  Worked = "Worked",
  Holiday = "Holiday",
}

export type WorkdaysState = Record<string, WorkDayStatus>;
