import React from "react";
import { createGlobalStyle } from "styled-components";

import { CssBaseline } from "@material-ui/core";

interface GlobalStyleProps {
  theme: any;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

interface Props {
  children: any;
}

function Landing({ children }: Props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </React.Fragment>
  );
}

export default Landing;
