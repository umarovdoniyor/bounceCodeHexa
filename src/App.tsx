import React from "react";
import { connect } from "react-redux";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";

import maTheme from "./theme";
import Routes from "./routes/Routes";

interface Props {
  theme: any;
}

function App({ theme }: Props) {
  return (
    <StylesProvider injectFirst>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
          <ThemeProvider theme={maTheme[theme.currentTheme]}>
            <Routes />
          </ThemeProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </StylesProvider>
  );
}

export default connect((store: any) => ({ theme: store.themeReducer }))(App);
