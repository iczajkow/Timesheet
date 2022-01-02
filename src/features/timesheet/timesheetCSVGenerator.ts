import moment from "moment";
import { WorkdaysState, WorkDayStatus } from "./model";

interface CSVItem {
  key: string;
  value: string;
}

export class TimesheetCSVGenerator {
  generateCSV(
    workdays: WorkdaysState,
    from: moment.Moment,
    to: moment.Moment
  ): string {
    const workdaysArray = Object.entries(workdays).map(([key, value]) => {
      return {
        key,
        value,
      };
    });

    const filteredWorkdays = workdaysArray.filter((value) =>
      this.isBetween(value.key, from, to)
    );

    const worklogResult = this.fillMissingFields(
      filteredWorkdays,
      from,
      to
    ).sort((a, b) => a.key.localeCompare(b.key));

    const summary = this.getSummary(worklogResult);
    const result = [...worklogResult, ...summary];

    return [...result.map((row) => `${row.key},${row.value}`)].join("\r\n");
  }

  private isBetween(
    date: string,
    from: moment.Moment,
    to: moment.Moment
  ): boolean {
    const comapreDate = moment(date);
    const fromDay = from.clone().startOf("day");
    const toDay = to.clone().startOf("day");
    return (
      comapreDate.isSameOrAfter(fromDay) && comapreDate.isSameOrBefore(toDay)
    );
  }

  private fillMissingFields(
    workdays: CSVItem[],
    from: moment.Moment,
    to: moment.Moment
  ): CSVItem[] {
    let result: CSVItem[] = [...workdays];
    const currentDate = from.clone().startOf("day");
    const toDate = to.clone().startOf("day");
    while (currentDate.isSameOrBefore(toDate)) {
      const hasItem = workdays.some(
        (item) => item.key === currentDate.format("YYYY-MM-DD")
      );

      if (!hasItem) {
        const isWeekend =
          currentDate.isoWeekday() === 7 || currentDate.isoWeekday() === 6;

        result = [
          ...result,
          {
            key: currentDate.format("YYYY-MM-DD"),
            value: isWeekend ? "Weekend" : WorkDayStatus.Holiday,
          },
        ];
      }

      currentDate.add(1, "day");
    }

    return result;
  }

  private getSummary(workdays: CSVItem[]): [CSVItem, CSVItem] {
    const totalWorked = workdays.filter(
      ({ value }) => value === WorkDayStatus.Worked
    ).length;
    const totalHoliday = workdays.filter(
      ({ value }) => value === WorkDayStatus.Holiday
    ).length;

    return [
      { key: "TotalWorked", value: totalWorked.toString() },
      { key: "TotalHoliday", value: totalHoliday.toString() },
    ];
  }
}

const timesheetCSVGenerator = new TimesheetCSVGenerator();

export default timesheetCSVGenerator;
