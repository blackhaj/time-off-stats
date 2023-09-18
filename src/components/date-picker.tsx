'use client';

import { useState } from 'react';
import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
} from '@tremor/react';
import { es } from 'date-fns/locale';
import dayjs from 'dayjs';
import {
  ALL_TIME,
  FUTURE,
  ONE_MONTH,
  ONE_YEAR,
  SIX_MONTHS,
  THREE_MONTHS,
  YTD,
  getToday,
  oneMonthAgo,
  oneYearAgo,
  sixMonthsAgo,
  threeMonthsAgo,
  yearStart,
} from '~/constants/timePeriods';

export function DatePicker({
  dateRange,
  setDateRange,
  oldestDate,
  futureDate,
}: {
  dateRange: DateRangePickerValue;
  setDateRange: (value: DateRangePickerValue) => void;
  oldestDate: Date;
  futureDate: Date;
}) {
  return (
    <DateRangePicker
      className="max-w-md mx-auto"
      value={dateRange}
      onValueChange={setDateRange}
      locale={es}
      selectPlaceholder="Select a date range"
      color="rose"
    >
      <DateRangePickerItem
        key={ONE_MONTH}
        value={ONE_MONTH}
        from={oneMonthAgo()}
      >
        Last month
      </DateRangePickerItem>
      <DateRangePickerItem
        key={THREE_MONTHS}
        value={THREE_MONTHS}
        from={threeMonthsAgo()}
      >
        Last quarter
      </DateRangePickerItem>
      <DateRangePickerItem
        key={SIX_MONTHS}
        value={SIX_MONTHS}
        from={sixMonthsAgo()}
      >
        Last six months
      </DateRangePickerItem>
      <DateRangePickerItem key={YTD} value={YTD} from={yearStart()}>
        Year to date
      </DateRangePickerItem>
      <DateRangePickerItem key={ONE_YEAR} value={ONE_YEAR} from={oneYearAgo()}>
        Last year
      </DateRangePickerItem>
      <DateRangePickerItem key={ALL_TIME} value={ALL_TIME} from={oldestDate}>
        All time
      </DateRangePickerItem>
      <DateRangePickerItem
        key={FUTURE}
        value={FUTURE}
        from={getToday()}
        to={futureDate}
      >
        Future leave
      </DateRangePickerItem>
    </DateRangePicker>
  );
}
