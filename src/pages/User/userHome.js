import React, { Component } from "react";
import "../../styles/Styles.css";
import Grid from "@material-ui/core/Grid";
import Login from "./userLogin";
import Register from "./userRegister";

export default class UserHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false,
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
                    {this.state.isLoginOpen === true && <Login renderRegister={this.renderRegister} />}

                    {this.state.isRegisterOpen === true && <Register renderLogin={this.renderLogin} />}
                </Grid>
            </Grid>
        )
    }
}