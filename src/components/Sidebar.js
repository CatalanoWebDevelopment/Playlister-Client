import React, { Component, ReactFragment } from "react";
import AccountRegistration from "../pages/Account/accountRegistration";
import UserRegistration from "../pages/User/userRegistration";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Route, Link, Switch } from "react-router-dom";
import theme from "../styles/Theme";
import { withStyles } from "@material-ui/core";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backGroundColor: theme.palette.primary.main
  }
});

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNavigation: false,
      value: ""
    };
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      showNavigation: false
    });
  };

  renderNavOnLogin = () => {
    if (!localStorage.getItem("SessionToken")) {
      return;
    }

    this.setState({
      showNavigation: true
    });
  };

  renderLinks() {
    if (this.state.showNavigation) {
      return (
        <React.Fragment>
          <Link to="/user">
            <UserRegistration />
          </Link>
        </React.Fragment>
      );
    }
  }

  handleNavChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.renderNavOnLogin();
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state.value;

    return (
      <Grid item xs={12}>
        <AppBar>
          <Tabs value={value} onChange={this.handleNavChange}>
            <Tab value="account" label="Home" />
          </Tabs>
        </AppBar>

        {value === "account" && (
          <TabContainer>
            <AccountRegistration />
          </TabContainer>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(Sidebar);