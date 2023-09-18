'use client';

import Papa from 'papaparse';
import Image from 'next/image';
import { DropZone } from '~/components/drop-zone/drop-zone';
import { UploadIcon } from '~/components/icons/upload-icon';
import { UploadFileButton } from '../drop-zone/upload-button';
import { Dispatch, SetStateAction, useState } from 'react';
import { FAQ } from '../faq';
import dayjs from 'dayjs';

const acceptedFiletypes = 'text/csv';

export type Row = {
  'Request Type'?: string;
  'Start Date'?: Date;
  'End Date'?: Date;
  'Num Days'?: number;
  'Holidays Taken'?: number;
  Status?: string;
};

export type CsvState = Papa.ParseResult<Row> & {
  oldestDate: dayjs.Dayjs;
  futureDate: dayjs.Dayjs;
};

let oldestDate = dayjs();
let futureDate = dayjs();

export const UploadPage = ({
  setParsedData,
}: {
  setParsedData: Dispatch<SetStateAction<CsvState | null>>;
}) => {
  const handleFile = (files: File[]) => {
    Papa.parse<Row>(files[0], {
      header: true,
      // preview: 2,
      dynamicTyping: true,
      transform: (value, header) => {
        // If its a date
        if (header === 'Start Date' || header === 'End Date') {
          // parse it
          const date = dayjs(value);

          // save the highest and lowest dates
          if (date.isBefore(oldestDate)) {
            oldestDate = date;
          }
          if (date.isAfter(futureDate)) {
            futureDate = date;
          }

          return date;
        }

        return value;
      },
      complete: (result) => {
        // save the first known date
        // Parse the dates on the way in

        setParsedData({ ...result, oldestDate, futureDate });
        // TODO - remove empty rows && throw if there is an error
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Use Time Off ⚡ by Deel but want more info on your PTO history?
        </h1>
        <h3 className="text-2xl font-bold text-center">
          Drop your csv export here 👇
        </h3>
      </div>

      <DropZone
        className="min-w-[50%] w-80 h-44 m-10"
        acceptedFiletypes={acceptedFiletypes}
        onFileDrop={handleFile}
      >
        <div className="flex flex-col items-center gap-3">
          <p className="text-center">Drop your file here.</p>
          <div>
            <UploadFileButton
              onFilesSelect={handleFile}
              accept={acceptedFiletypes}
            >
              Or click to upload
            </UploadFileButton>
          </div>
        </div>
      </DropZone>
      <FAQ />
    </>
  );
};
