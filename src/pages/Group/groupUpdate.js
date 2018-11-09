import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Modal from "react-responsive-modal";
import { Button, FormControl, InputLabel, Input, Grid } from "@material-ui/core";

export default class GroupUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accountId: '',
            name: ''
        }
    }

    setAccountId = () => {
        let token = localStorage.getItem("SessionToken")
        let accountId = jwt_decode(token).accountId

        this.setState({
            accountId
        })
    }

    onSubmitUpdate = event => {
        event.preventDefault();
        let name = this.state.name
    }

    loadAllGroups = () => {
        let accountId = this.state.accountId

        fetch(`http://localhost:3000/group/all/${accountId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            }
        }).then(response => response.json())
        .then(response => {
            if (response.length !== 0) {
                return response.group.map(group => {
                    return (
                        <Grid item xs={12}>
                            <form>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="name">{group.name}</InputLabel>

                                    <Input id="name" name="name" autoFocus onChange={this.handleChange} />
                                </FormControl>
                            </form>
                        </Grid>
                    )
                })
            }
        })
    }

    componentWillMount() {
        this.setAccountId();
    }

    render() {
        return(
            <Grid container spacing={12}>
                {this.loadAllGroups()}
            </Grid>
        )
    }
}