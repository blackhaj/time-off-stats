'use client';

import Papa from 'papaparse';
import Image from 'next/image';
import { DropZone } from '~/components/drop-zone/drop-zone';
import { UploadIcon } from '~/components/upload-icon';
import { UploadFileButton } from './drop-zone/upload-button';
import { useState } from 'react';

const acceptedFiletypes = 'text/csv';

type Row = {
  Email: string;
  Name?: string;
  Department?: string;
  'Location/Region'?: string;
  'Job Title'?: string;
  'Employee start date'?: Date;
  'Request Type'?: string;
  'Submitted At'?: string;
  Approvers?: string;
  Status?: string;
  Message?: string;
  'Denial Reason'?: string;
  'Start Date'?: Date;
  'End Date'?: Date;
  'Num Days'?: string;
  'Holidays Taken'?: string;
};

type ParsedData = Array<Row>;

export const MainPage = () => {
  const [parsedData, setParsedData] = useState<ParsedData>([]);

  const handleFile = (files: File[]) => {
    Papa.parse<Row>(files[0], {
      header: true,
      complete: (result) => {
        if (!result.errors.length) {
          setParsedData(result.data);
        }
        console.log(result);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Use PTO by Deel but want more info on your PTO history?
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
          <p className="text-center">Drop your files here.</p>
          <div>
            <UploadFileButton
              onFilesSelect={handleFile}
              accept={acceptedFiletypes}
            >
              Or upload
            </UploadFileButton>
          </div>
        </div>
      </DropZone>
    </>
  );
};
