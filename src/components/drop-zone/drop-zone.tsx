'use client';

import React, { useState } from 'react';

import { areFileTypesInvalid, handleDragOver } from './drop-zone.utils';
import { cn } from '~/utils/cn';

interface DropZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileDrop: (files: File[]) => void;
  children?: React.ReactNode;
  acceptedFiletypes?: string;
  className?: string;
}

export function DropZone({
  children,
  onFileDrop,
  acceptedFiletypes,
  className,
  ...props
}: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [containsInvalidTypes, setContainsInvalidTypes] = useState(false);

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === 'dragover' || event.type === 'dragenter') {
      const isInvalid = areFileTypesInvalid({
        acceptedFiletypes,
        items: event.dataTransfer.items,
      });

      if (isInvalid) {
        setContainsInvalidTypes(true);
      }

      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
      setContainsInvalidTypes(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!containsInvalidTypes && event.dataTransfer.items.length > 0) {
      onFileDrop([...event.dataTransfer.files]);
    }

    setContainsInvalidTypes(false);
    setDragActive(false);
  };

  return (
    <div
      {...props}
      className={cn(
        className,
        'flex justify-center items-center rounded-md border border-dashed border-gray-300 p-4',
        dragActive && 'border-blue-400',
        containsInvalidTypes && 'border-red-400'
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}
