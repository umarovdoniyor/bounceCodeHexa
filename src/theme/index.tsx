import { createMuiTheme } from "@material-ui/core/styles";

import variants from "./variants";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import props from "./props";
import shadows from "./shadows";

export interface GlobalStyleProps {
  spacing: any;
  breakpoints: any;
  overrides: any;
  props: any;
  typography: any;
  shadows: any;
  body: any;
  header: any;
  palette: any;
  sidebar: any;
}

const theme = (variant: any) => {
  const options: GlobalStyleProps = {
    spacing: 4,
    breakpoints: breakpoints,
    overrides: overrides,
    props: props,
    typography: typography,
    shadows: shadows,
    body: variant.body,
    header: variant.header,
    palette: variant.palette,
    sidebar: variant.sidebar
  };

  // @ts-ignore
  return createMuiTheme(options, variant.name);
};

const themes = variants.map(variant => theme(variant));

export default themes;
