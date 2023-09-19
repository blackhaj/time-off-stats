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
import { calculateStats } from '~/utils/calculateStats';

const colors: Color[] = ['indigo', 'rose', 'cyan', 'amber', 'violet', 'slate'];

const valueFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export const StatsPage = ({
  data,
  dateRange,
  setDateRange,
  setParsedData,
}: {
  data: CsvState;
  dateRange: DateRangePickerValue;
  setDateRange: (value: DateRangePickerValue) => void;
  setParsedData: () => void;
}) => {
  const { barChartData, donutChartData, categories, total, periodInMonths } =
    calculateStats({
      data,
      dateRange,
    });

  const noDatePicked = !dateRange.from || !dateRange.to;

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
            <Metric>{total}</Metric>
            <Text className="truncate">
              over past {periodInMonths} month{periodInMonths === 1 ? '' : 's'}
            </Text>
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
        {donutChartData.length ? (
          <>
            <Card className="flex flex-col items-center">
              <Title>Time off by category</Title>
              <DonutChart
                className="mt-6"
                data={donutChartData}
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
                data={donutChartData}
                valueFormatter={valueFormatter}
                className="mt-2"
              />
            </Card>
          </>
        ) : noDatePicked ? (
          <Card className="col-span-full">
            <Title>No date range</Title>
            <Text>
              Pick a date from the date picker above to see your stats
            </Text>
          </Card>
        ) : (
          <Card className="col-span-full">
            <Title>No data</Title>
            <Text>
              Looks like you didn&apos;t have any time off over this period, try
              another
            </Text>
          </Card>
        )}
        <Card className="col-span-full">
          <Title>Monthly</Title>
          <Text>Your all time PTO history, month by month</Text>
          <BarChart
            className="mt-4 h-80"
            data={barChartData}
            index="Month"
            categories={categories}
            colors={colors}
            valueFormatter={valueFormatter}
            stack={true}
          />
        </Card>
      </Grid>
      <div className="w-full lg:max-w-screen-lg flex">
        <a
          className="underline hover:text-grey-800 cursor-pointer ml-auto p-2"
          onClick={setParsedData}
        >
          Click to reset import
        </a>
      </div>
      <FAQ />
    </>
  );
};
