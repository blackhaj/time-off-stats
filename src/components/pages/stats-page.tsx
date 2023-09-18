import {
  BarChart,
  BarList,
  Card,
  Color,
  DateRangePickerValue,
  Flex,
  Grid,
  Legend,
  Metric,
  Text,
  Title,
} from '@tremor/react';
import { CsvState } from './upload-page';
import { DatePicker } from '../date-picker';
import { useState } from 'react';
import { DonutChart } from '@tremor/react';
import { FAQ } from '../faq';

const donutData = [
  {
    name: 'Vacation',
    value: 100,
  },
  {
    name: 'Public Holiday',
    value: 20,
  },
  {
    name: 'Out Sick',
    value: 15,
  },
  {
    name: 'Maze Offsite',
    value: 9,
  },
];

const chartData = [
  {
    Month: 'March 23',
    Vacation: 3,
    'Public Holiday': 0,
    'Out Sick': 1,
    'Maze Offsite': 0,
  },
  {
    Month: 'April 23',
    Vacation: 5,
    'Public Holiday': 2,
    'Out Sick': 0,
    'Maze Offsite': 0,
  },
  {
    Month: 'May 23',
    Vacation: 0,
    'Public Holiday': 3,
    'Out Sick': 0,
    'Maze Offsite': 0,
  },
  {
    Month: 'Jun 23',
    Vacation: 5,
    'Public Holiday': 1,
    'Out Sick': 0,
    'Maze Offsite': 0,
  },
  {
    Month: 'Jul 23',
    Vacation: 1,
    'Public Holiday': 0,
    'Out Sick': 0,
    'Maze Offsite': 0,
  },
  {
    Month: 'Aug 23',
    Vacation: 4,
    'Public Holiday': 2,
    'Out Sick': 0,
    'Maze Offsite': 0,
  },
  {
    Month: 'Sept 23',
    Vacation: 1,
    'Public Holiday': 0,
    'Out Sick': 0,
    'Maze Offsite': 0,
  },
];

const categories = donutData.map((d) => d.name);

const colors: Color[] = ['amber', 'cyan', 'rose', 'indigo', 'violet', 'slate'];

const valueFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export const StatsPage = ({
  data,
  dateRange,
  setDateRange,
}: {
  data: CsvState;
  dateRange: DateRangePickerValue;
  setDateRange: (value: DateRangePickerValue) => void;
}) => {
  console.log(data);

  // When it date changes, calculate the new stats
  // Categories & number of days

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Your Time Off history
        </h1>
      </div>
      <Grid numItemsMd={2} className="mt-6 gap-6 w-full lg:max-w-screen-lg">
        <Card>
          <Text>Total days off</Text>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="truncate space-x-3 mt-2"
          >
            <Metric>{100}</Metric>
            <Text className="truncate">over past 30 days</Text>
          </Flex>
        </Card>
        <Card className="flex justify-center items-center">
          <DatePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            oldestDate={data.oldestDate.toDate()}
            futureDate={data.futureDate.toDate()}
          />
        </Card>
        <Card className="flex flex-col items-center">
          <Title>Time off by category</Title>
          <DonutChart
            className="mt-6"
            data={donutData}
            category="value"
            index="name"
            valueFormatter={valueFormatter}
            colors={colors}
            showLabel={false}
            variant="pie"
          />
          <Legend
            className="mt-3 mx-auto justify-center"
            categories={categories}
            colors={colors}
          />
        </Card>
        <Card>
          <Flex className="mt-6">
            <Text>Type</Text>
            <Text className="text-right">Days</Text>
          </Flex>
          <BarList
            data={donutData}
            valueFormatter={valueFormatter}
            className="mt-2"
          />
        </Card>
        <Card className="col-span-full">
          <Title>Monthly</Title>
          <Text>Your PTO month by month</Text>
          <BarChart
            className="mt-4 h-80"
            data={chartData}
            index="Month"
            categories={categories}
            colors={colors}
            valueFormatter={valueFormatter}
            stack={true}
          />
        </Card>
      </Grid>
      <FAQ />
    </>
  );
};
