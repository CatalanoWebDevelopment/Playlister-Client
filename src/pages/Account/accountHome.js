import React, { Component } from "react";
import "../../styles/Styles.css";
import Grid from "@material-ui/core/Grid";
import Login from "./accountLogin";
import Register from "./accountRegister";

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