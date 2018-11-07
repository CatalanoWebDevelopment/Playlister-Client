import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

export default class AccountManagement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <p>Hello World</p>
                </Grid>
            </Grid>
        )
    }
}