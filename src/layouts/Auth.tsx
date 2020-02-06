import React from "react";
import styled, { createGlobalStyle } from "styled-components";

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

const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

interface Props {
  children: any;
}

function Auth({ children }: Props) {
  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </Root>
  );
}

export default Auth;
