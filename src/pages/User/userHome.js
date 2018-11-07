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
                    <div className="buttonController">
                        <div onClick={this.renderLogin} className={'control' + ' ' + (this.state.isLoginOpen === true ? 'leftActive' : '')}>Login</div>

                        <div onClick={this.renderRegister} className={'control' + ' ' + (this.state.isRegisterOpen === true ? 'rightActive' : '')}>Register</div>
                    </div>

                    {this.state.isLoginOpen === true && <Login renderRoutes={this.props.renderRoutes} />}

                    {this.state.isRegisterOpen === true && <Register renderRoutes={this.props.renderRoutes} />}
                </Grid>
            </Grid>
        )
    }
}