import { antdTheme } from "./antdTheme";
import { typography } from "./typography";
import { lightTheme, darkTheme } from "./theme";

const lTheme = {
  typography,
  colors: lightTheme,
} as const;
const dTheme = {
  typography,
  colors: darkTheme,
} as const;

export { antdTheme, lTheme, dTheme };
