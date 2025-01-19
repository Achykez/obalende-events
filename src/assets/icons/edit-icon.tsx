import { DetailedHTMLProps, FC, SVGProps } from 'react';

export const EditIcon: FC<
  DetailedHTMLProps<SVGProps<SVGSVGElement>, SVGSVGElement>
> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_3846_64219)">
        <path
          d="M7.3335 2.66797H2.66683C2.31321 2.66797 1.97407 2.80844 1.72402 3.05849C1.47397 3.30854 1.3335 3.64768 1.3335 4.0013V13.3346C1.3335 13.6883 1.47397 14.0274 1.72402 14.2774C1.97407 14.5275 2.31321 14.668 2.66683 14.668H12.0002C12.3538 14.668 12.6929 14.5275 12.943 14.2774C13.193 14.0274 13.3335 13.6883 13.3335 13.3346V8.66797"
          stroke="#344054"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.3335 1.66812C12.5987 1.4029 12.9584 1.25391 13.3335 1.25391C13.7086 1.25391 14.0683 1.4029 14.3335 1.66812C14.5987 1.93334 14.7477 2.29305 14.7477 2.66812C14.7477 3.04319 14.5987 3.4029 14.3335 3.66812L8.00016 10.0015L5.3335 10.6681L6.00016 8.00145L12.3335 1.66812Z"
          stroke="#344054"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3846_64219">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
