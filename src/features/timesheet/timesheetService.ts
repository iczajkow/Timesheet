import { WorkdaysState } from "./model";

export class TimesheetService {
  private key = "workdays";

  saveWorkdays(worklogs: WorkdaysState): void {
    const worklogsSerialized = JSON.stringify(worklogs);
    localStorage.setItem(this.key, worklogsSerialized);
  }

  readWorkdays(): WorkdaysState {
    const data = localStorage.getItem(this.key);
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  }
}

const timesheetService = new TimesheetService();
export default timesheetService;
