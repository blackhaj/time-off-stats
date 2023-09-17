"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { createContext, useContext } from "react";

export interface DropZoneContextType {
  selectedFiles: File[];
  onAddFiles: (files: File[]) => void;
  onFileDelete: (file: File) => void;
}

export const DropZoneContext = createContext<DropZoneContextType>({
  selectedFiles: [],
  onAddFiles: () => {},
  onFileDelete: () => {},
});

export const useDropZoneContext = () => useContext(DropZoneContext);

export const DropZoneContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onAddFiles = useCallback((files: File[]) => {
    setSelectedFiles((prev) => {
      // Dedupe files, comparing name and size
      const dedupedFiles = prev.filter((file) => {
        return !files.some(
          (newFile) => newFile.name === file.name && newFile.size === file.size
        );
      });

      return [...dedupedFiles, ...files];
    });
  }, []);

  const onFileDelete = useCallback(
    (file: File) =>
      setSelectedFiles((existing) =>
        existing.filter((selectedFile) => selectedFile !== file)
      ),
    []
  );

  const value = useMemo(() => {
    return {
      selectedFiles,
      onAddFiles,
      onFileDelete,
    };
  }, [onAddFiles, onFileDelete, selectedFiles]);

  return (
    <DropZoneContext.Provider value={value}>
      {children}
    </DropZoneContext.Provider>
  );
};
