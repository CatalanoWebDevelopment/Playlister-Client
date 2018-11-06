import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "./styles/Theme";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/Sidebar";

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <Grid container spacing={24}>
          <Router>
            <Sidebar />
          </Router>
        </Grid>
      </MuiThemeProvider>
    );
  }
}
