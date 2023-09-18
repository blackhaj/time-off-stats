'use client';

import Papa from 'papaparse';
import Image from 'next/image';
import { DropZone } from '~/components/drop-zone/drop-zone';
import { UploadIcon } from '~/components/icons/upload-icon';
import { UploadFileButton } from '../drop-zone/upload-button';
import { useState } from 'react';
import { CsvState, Row, UploadPage } from './upload-page';
import { StatsPage } from './stats-page';
import dayjs from 'dayjs';
import { DateRangePickerValue } from '@tremor/react';
import { oneMonthAgo } from '~/constants/timePeriods';

const acceptedFiletypes = 'text/csv';

export const MainPage = () => {
  const [parsedData, setParsedData] = useState<CsvState | null>(null);
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: oneMonthAgo(),
    to: new Date(),
  });

  console.log(dateRange);

  if (!parsedData) {
    return <UploadPage setParsedData={setParsedData} />;
  }

  return (
    <StatsPage
      data={parsedData}
      dateRange={dateRange}
      setDateRange={setDateRange}
    />
  );
};
