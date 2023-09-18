import { ReactNode } from 'react';

export const DownloadLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = href;
    link.download = 'time-off-example.csv';
    link.click();
  };
  return (
    <a
      className="underline hover:text-grey-800 cursor-pointer"
      onClick={downloadFile}
    >
      {children}
    </a>
  );
};
