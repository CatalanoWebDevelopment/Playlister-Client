import React, { Component } from "react";
import "../../styles/Styles.css";
import Grid from "@material-ui/core/Grid";
import Create from "./groupCreate";
import Update from "./groupUpdate";

export default class GroupHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCreateOpen: true,
            isUpdateOpen: false,
        }
    }

    renderCreate = () => {
        this.setState({
            isCreateOpen: true,
            isUpdateOpen: false
        })
    }

    renderUpdate = () => {
        this.setState({
            isCreateOpen: false,
            isUpdateOpen: true
        })
    }

    render() {
        return(
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    {this.state.isCreateOpen === true && <Create renderUpdate={this.renderUpdate} />}

                    {this.state.isUpdateOpen === true && <Update renderCreate={this.renderCreate} />}
                </Grid>
            </Grid>
        )
    }
}