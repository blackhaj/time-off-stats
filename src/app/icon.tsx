import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg">
        <path y="32" font-size="32">
          🌴
        </path>
      </svg>
    ),
    {
      ...size,
    }
  );
}
