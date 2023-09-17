'use client';

export const isValidType = ({
  file,
  acceptedFiletypes,
}: {
  file: DataTransferItem;
  acceptedFiletypes: string;
}) => {
  const acceptedTypes = acceptedFiletypes.split(',');

  for (const type of acceptedTypes) {
    const trimmedType = type.trim();
    if (trimmedType === file.type) return true;

    if (trimmedType.endsWith('/*')) {
      const [mainType] = type.split('/');
      const [fileMainType] = file.type.split('/');

      if (mainType === fileMainType) {
        return true;
      }
    }
  }
  return false;
};

export const areFileTypesInvalid = ({
  acceptedFiletypes,
  items,
}: {
  acceptedFiletypes?: string;
  items: DataTransferItemList;
}) => {
  if (!acceptedFiletypes) return false;

  return [...items].some((file) => !isValidType({ acceptedFiletypes, file }));
};

export const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};
