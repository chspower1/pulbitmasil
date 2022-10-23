import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    mainColor: string;
    textColor: string;
    weekColor: string;
    accentColor: string;
    borderColor: string;
    dangerColor: string;
    accentDangerColor: string;
    weekBorderColor: string;
  }
}
