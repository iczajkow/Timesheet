import moment from "moment";
import { WorkdaysState } from "./model";

export class TimesheetCSVGenerator {
  generateCSV(
    workdays: WorkdaysState,
    from: moment.Moment,
    to: moment.Moment
  ): string {
    const workdaysArray = Object.entries(workdays).map(([key, value]) => {
      return {
        date: key,
        value,
      };
    });

    const filteredWorkdays = workdaysArray.filter((value) =>
      this.isBetween(value.date, from, to)
    );

    console.log({
      filteredWorkdays,
      from, to
    })

    return [...filteredWorkdays.map((row) => `${row.date},${row.value}`)].join(
      "\r\n"
    );
  }

  private isBetween(
    date: string,
    from: moment.Moment,
    to: moment.Moment
  ): boolean {
    const comapreDate = moment(date);
    const fromDay = from.clone().startOf("day");
    const toDay = from.clone().startOf("day");
    return (
      comapreDate.isSameOrAfter(fromDay) && comapreDate.isSameOrBefore(toDay)
    );
  }
}

const timesheetCSVGenerator = new TimesheetCSVGenerator();

export default timesheetCSVGenerator;
