import { UploadIcon } from '../icons/upload-icon';

type Props = {
  onFilesSelect: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
};

export const UploadFileButton = ({
  children,
  onFilesSelect,
  accept = '',
  multiple = false,
}: Props) => {
  const handleChooseFile = (evt: React.MouseEvent) => {
    evt.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.multiple = multiple;
    input.onchange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;
      if (files) {
        onFilesSelect([...files]);
      }
    };
    input.click();
  };

  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={handleChooseFile}
    >
      <UploadIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      {children}
    </button>
  );
};
