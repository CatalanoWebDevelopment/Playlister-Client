import React, { Component } from "react";
import AccountHome from "../pages/Account/accountHome";
import UserRegistration from "../pages/User/userRegistration";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { Route, Link, Switch } from "react-router-dom";
import theme from "../styles/Theme";
import { withStyles, AppBar, Tabs } from "@material-ui/core";
import classNames from "classnames"
import PropTypes from "prop-types"
import styled from "styled-components"
import Styles from "../styles/Styles.css"

const styles = theme => ({
  root: {
    flexGrow: 1,
    backGroundColor: theme.palette.secondary.dark
  }
});

const ListItem = styled.li`
  text-align: center;
  color: black;
  list-style: none;
`

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNavigation: false,
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

  componentDidMount() {
    this.renderNavOnLogin();
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <AppBar>
            <Tabs>
              <Link to="/"><ListItem><Tab label="Account" className="largeFont"  ></Tab></ListItem></Link>
              {this.renderLinks()}
            </Tabs>
          </AppBar>
        </Grid>

        <Grid item xs={12}>
          <Switch>
            <Route exact path="/"><AccountHome renderRoutes={this.renderNavOnLogin}/></Route>
            <Route exact path="/user"><UserRegistration renderRoutes={this.renderNavOnLogin} /></Route>
          </Switch>
        </Grid>
      </Grid>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sidebar);
