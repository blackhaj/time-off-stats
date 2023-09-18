import Link from 'next/link';
import { ReactNode } from 'react';

export const InlineLink = ({
  children,
  href,
  external = false,
  download = false,
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
  download?: boolean;
}) => {
  return (
    <Link
      className="underline hover:text-grey-800"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      download={download}
    >
      {children}
    </Link>
  );
};
