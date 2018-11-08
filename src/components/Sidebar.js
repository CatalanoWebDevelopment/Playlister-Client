import React, { Component } from "react";
import AccountHome from "../pages/Account/accountHome";
import UserHome from "../pages/User/userHome";
import AccountManagement from "../pages/Account/accountManagement"
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { Route, Link, Switch } from "react-router-dom";
import theme from "../styles/Theme";
import { withStyles, AppBar, Tabs } from "@material-ui/core";
import PropTypes from "prop-types"
import styled from "styled-components"
import "../styles/Styles.css"

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
      token: ''
    };
  }

  setToken = token => {
    this.setState({
      token: token
    })
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      showNavigation: false,
      token: ''
    });
  };

  renderNavOnLogin = () => {
    if (!localStorage.getItem("SessionToken")) {
      return
    }

    this.setState({
      showNavigation: true
    });
  };

  renderLinks() {
    if (this.state.showNavigation) {
      return (
        <React.Fragment>
          <Link to="/account">
            <ListItem>
              <Tab label="Account" className="largeFont" />
            </ListItem>
          </Link>
          
          <Link to="/user">
            <ListItem>
              <Tab label="User Profiles" className="largeFont" />
            </ListItem>
          </Link>

          <ListItem>
            <Tab label="Logout" className="largeFont" onClick={this.logout} />
          </ListItem>
        </React.Fragment>
      );
    }
  }

  renderViews = () => {
    if (this.state.token === localStorage.getItem("SessionToken")) {
      return (
        <Switch>
          <Route exact path="/account"><AccountManagement /></Route>
          <Route exact path="/user"><UserHome renderRoutes={this.renderNavOnLogin} /></Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route exact path="/"><AccountHome renderRoutes={this.renderNavOnLogin} setToken={this.setToken} /></Route>
        </Switch>
      )
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
              {this.renderLinks()}
            </Tabs>
          </AppBar>
        </Grid>

        <Grid item xs={12}>
          {this.renderViews()}
        </Grid>
      </Grid>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sidebar);
