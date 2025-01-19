import "styled-components";
import { lTheme } from "@/theme";

type ITheme = typeof lTheme;
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ITheme {}
}
