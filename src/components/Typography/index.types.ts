export const variantMapping = {
    "h-xxl": "h1",
    "h-xl": "h2",
    "h-l": "h3",
    "h-m": "h4",
    "h-s": "h5",
    "h-xs": "h6",
    "p-xxl": "p",
    "p-xl": "p",
    "p-l": "p",
    "p-m": "p",
    "p-s": "p",
    "c-xxl": "h3",
    "c-xl": "h4",
    "c-l": "h5",
    "c-m": "p",
    "c-s": "h6",
    span: "span",
    div: "div",
  };
  
  export type TypographyVariant = keyof typeof variantMapping;
  
  export type TypographyColors =
    
    //Text Colors
    | "text-default"
    | "text-light"
    | "white"
    | "grey1"
    | "grey2"
    | "green1"
    | "green2"
    | "green3"
    | "black"
    | 'dashboardGrey'
    | "dashboardGreen"
    | "dashboardGrey2"
    | "tabUnderlineColor"
    | "sideBarColor"
    | "navPathColor"

  export type TypographyAlign =
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify";
  
  export type TypographyFontWeight =
    | "thin"
    | "extralight"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "black";
  
  export type TypographyFont = "poppins"| "Inter"| "montserrat";
  
  export interface TypographyProps
    extends React.HTMLAttributes<HTMLOrSVGElement> {
    tag?: keyof JSX.IntrinsicElements;
    variant?: TypographyVariant;
    color?: TypographyColors;
    fontWeight?: TypographyFontWeight;
    gutterBottom?: boolean;
    align?: TypographyAlign;
    noWrap?: boolean;
    underline?: "none" | "always" | "hover";
    customClassName?: string;
    children?: React.ReactNode;
    font?: TypographyFont;
  }
  