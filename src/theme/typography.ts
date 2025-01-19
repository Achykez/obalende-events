import { css } from 'styled-components';

export enum FontWeight {
  Regular = 400,
  Medium = 500,
  SemiBold = 600,
  Bold = 700,
}

export enum TextVarient {
  HEADER1 = 'Header1',
  HEADER2 = 'Header2',
  HEADER3 = 'Header3',
  HEADING3 = 'Heading3',
  HEADER4 = 'Header4',
  HEADER5 = 'Header5',
  HEADER6 = 'Header6',
  BODY_BIG = 'Body_Big',
  SEMI_BIG = 'Semi_Big',
  BODY_MEDIUM = 'Body_Medium',
  BODY_SMALL = 'Body_Small',
  BODY_SMALLER = 'Body_Smaller',
  BODY_SMALLEST = 'Body_Smallest',
}

const SizeConfig = {
  [TextVarient.HEADER1]: {
    fontSize: '56px',
    lineHeight: '64px',
  },
  [TextVarient.HEADER2]: {
    fontSize: '48px',
    lineHeight: '56px',
  },
  [TextVarient.HEADING3]: {
    fontSize: '32px',
    lineHeight: '56px',
  },
  [TextVarient.HEADER3]: {
    fontSize: '34px',
    lineHeight: '42px',
  },
  [TextVarient.HEADER4]: {
    fontSize: '24px',
    lineHeight: '32px',
  },
  [TextVarient.HEADER5]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
  [TextVarient.HEADER6]: {
    fontSize: '16px',
    lineHeight: '20px',
  },
  [TextVarient.BODY_BIG]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
  [TextVarient.SEMI_BIG]: {
    fontSize: '18px',
    lineHeight: '21px',
  },
  [TextVarient.BODY_MEDIUM]: {
    fontSize: '16px',
    lineHeight: '20px',
  },
  [TextVarient.BODY_SMALL]: {
    fontSize: '14px',
    lineHeight: '16px',
  },
  [TextVarient.BODY_SMALLER]: {
    fontSize: '13px',
    lineHeight: '16px',
  },
  [TextVarient.BODY_SMALLEST]: {
    fontSize: '10px',
    lineHeight: '12px',
  },
};

/**
 *
 * @param weight default FontWeight.Regular
 * @param variant  default TextVa rient.Text_MD
 * @description returns the associated typograpy text style
 * @returns
 */
const getTextStyle = ({
  weight = FontWeight.Regular,
  variant = TextVarient.BODY_MEDIUM,
}: {
  weight?: FontWeight;
  variant?: TextVarient;
} = {}) =>
  css({
    fontFamily: 'Roboto, sans-serif',
    fontWeight: weight,
    fontSize: SizeConfig[variant].fontSize,
    lineHeight: SizeConfig[variant].lineHeight,
  });

export const typography = {
  getTextStyle,
  weights: FontWeight,
  variants: TextVarient,
};
