import { DateRangePickerValue } from '@tremor/react';
import dayjs from 'dayjs';
import { CsvState } from '~/components/pages/upload-page';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type DonutChartData = Array<{
  name: string;
  value: number;
}>;

type BarChartDataItem = {
  Month: string;
  Vacation: number;
  'Public Holiday': number;
  'Out Sick': number;
  'Maze Offsite': number;
};

type BarChartData = Array<BarChartDataItem>;

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const calculateStats = ({
  dateRange,
  data,
}: {
  dateRange: DateRangePickerValue;
  data: CsvState;
}) => {
  const { from, to } = dateRange;
  const selectedPeriodStart = dayjs(from);
  const selectedPeriodEnd = dayjs(to);
  const periodInMonths =
    selectedPeriodEnd.diff(selectedPeriodStart, 'month') + 1;

  // TODO fix incorrect month count
  // Incorrect on first load
  // Issue is because the of local timezones (the initial timezones are instantiated on the server)

  const categories = new Set<string>();

  const periodCategoryCounts: {
    [key: string]: number;
  } = {};

  const monthlyTotals: {
    [year: number]: {
      [month: number]: {
        [category: string]: number;
      };
    };
  } = {};

  data.data.forEach((row) => {
    const requestType = row['Request Type'];
    const status = row['Status'];
    const rowStart = row['Start Date'];
    const rowEnd = row['End Date'];
    const holidaysTaken = row['Holidays Taken'];
    const numDays = row['Num Days'];

    if (
      status !== 'Approved' ||
      !requestType ||
      !rowEnd ||
      !rowStart ||
      numDays === undefined ||
      holidaysTaken === undefined
    ) {
      return;
    }

    // TODO - time off overlapping months is counted in start month
    // process monthly data
    const rowYear = rowStart.year();
    const rowMonth = rowStart.month();
    const rowCount = numDays + holidaysTaken;

    if (!monthlyTotals[rowYear]) {
      monthlyTotals[rowYear] = {
        [rowMonth]: {
          [requestType]: rowCount,
        },
      };
    } else if (!monthlyTotals[rowYear]?.[rowMonth]) {
      monthlyTotals[rowYear][rowMonth] = {
        [requestType]: rowCount,
      };
    } else if (monthlyTotals[rowYear]?.[rowMonth]) {
      monthlyTotals[rowYear][rowMonth][requestType] =
        (monthlyTotals[rowYear][rowMonth][requestType] || 0) + rowCount;
    }

    // save the categories to the set
    categories.add(requestType);

    // is inside date range
    if (
      rowStart.isSameOrAfter(selectedPeriodStart) &&
      rowEnd.isSameOrBefore(selectedPeriodEnd)
    ) {
      periodCategoryCounts[requestType] =
        (periodCategoryCounts[requestType] || 0) + rowCount;
      return;
    }

    // started before and ended after
    if (
      rowStart.isSameOrBefore(selectedPeriodStart) &&
      rowEnd.isSameOrAfter(selectedPeriodEnd)
    ) {
      // Just count the days in the selected range
      const diff = selectedPeriodStart.diff(selectedPeriodEnd, 'days');
      periodCategoryCounts[requestType] =
        (periodCategoryCounts[requestType] || 0) + diff;
      return;
    }

    // started before and ended during
    if (
      rowStart.isSameOrBefore(selectedPeriodStart) &&
      rowEnd.isSameOrBefore(selectedPeriodEnd) &&
      rowEnd.isSameOrAfter(selectedPeriodStart)
    ) {
      // start of period to end date
      const diff = selectedPeriodStart.diff(rowEnd, 'days');
      periodCategoryCounts[requestType] =
        (periodCategoryCounts[requestType] || 0) + diff;
      return;
    }

    // started during and ended after
    if (
      rowStart.isSameOrAfter(selectedPeriodStart) &&
      rowStart.isSameOrBefore(selectedPeriodStart) &&
      rowEnd.isSameOrAfter(selectedPeriodEnd)
    ) {
      // startDate to end of period
      const diff = rowStart.diff(selectedPeriodEnd, 'days');
      periodCategoryCounts[requestType] =
        (periodCategoryCounts[requestType] || 0) + diff;
      return;
    }
  });

  const categoriesArray = [...categories];

  // To ensure the legend colors are correct, we map over the categories
  const donutChartData = categoriesArray.map((category) => {
    return {
      name: category,
      value: periodCategoryCounts[category] || 0,
    };
  });

  const barChartData: BarChartData = [];
  Object.entries(monthlyTotals).forEach(([year, months]) => {
    Object.entries(months).forEach(([month, categories]) => {
      barChartData.push({
        Month: `${monthNames[Number(month)]} ${year}`,
        ...categories,
      } as BarChartDataItem);
    });
  });

  return {
    donutChartData,
    barChartData,
    categories: categoriesArray,
    total: donutChartData.reduce((acc, curr) => acc + curr.value, 0),
    periodInMonths,
  };
};
