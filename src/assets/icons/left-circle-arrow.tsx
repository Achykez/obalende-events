import { DetailedHTMLProps, FC, SVGProps } from 'react';

export const LeftCirleArrow: FC<
  DetailedHTMLProps<SVGProps<SVGSVGElement>, SVGSVGElement>
> = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27 20H13"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 27L13 20L20 13"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="black" />
  </svg>
);
