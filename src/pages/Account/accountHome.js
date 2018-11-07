import React, { Component } from "react";
import "../../styles/Styles.css";
import Grid from "@material-ui/core/Grid";
import Login from "./accountLogin";
import Register from "./accountRegister";
import Management from "./accountManagement";

export default class AccountHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false
        }
    }

    renderLogin = () => {
        this.setState({
            isLoginOpen: true,
            isRegisterOpen: false
        })
    }

    renderRegister = () => {
        this.setState({
            isLoginOpen: false,
            isRegisterOpen: true
        })
    }

    renderAccountManagement = () => {
        if (localStorage.getItem('SessionToken') !== undefined) {
            return (
                <React.Fragment>
                    <Management />
                </React.Fragment>
            )
        }

        return
    }

    componentDidMount() {
        this.renderAccountManagement()
    }

    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    {this.state.isLoginOpen === true && <Login renderRoutes={this.props.renderRoutes} renderRegister={this.renderRegister} />}

                    {this.state.isRegisterOpen === true && <Register renderRoutes={this.props.renderRoutes} renderLogin={this.renderLogin} />}
                </Grid>
            </Grid>
        )
    }
}