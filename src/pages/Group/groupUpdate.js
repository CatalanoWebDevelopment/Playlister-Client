import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Modal from "react-responsive-modal";
import { Button, FormControl, InputLabel, Input, Grid } from "@material-ui/core";

export default class GroupUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accountId: '',
            name: '',
            id: '',
            groups: []
        }
    }

    setAccountId = () => {
        let token = localStorage.getItem("SessionToken")
        let accountId = jwt_decode(token).accountId

        this.setState({
            accountId
        })
    }

    onSubmitUpdate = (event, id) => {
        event.preventDefault();
        let name = this.state.name
        let updatedGroup = { name }

        fetch(`http://localhost:3000/group/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedGroup)
        }).then(response => response.json())
        .then(this.renderGroups())
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
            console.log(response)
            console.log(response.group)
            response.group.map(group => {
                this.setState({
                    groups: [...this.state.groups, group]
                })
            })
        })      
    }

    renderGroups = () => {
        if (this.state.groups.length !== 0) {
            return this.state.groups.map((group, index) => {
                return (
                    <Grid item xs={12} key={index}>
                        <form onSubmit={(event) => this.updatedGroup(event, index)}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="name">{group.name}</InputLabel>

                                <Input id="name" name="name" autoFocus onChange={this.handleChange} />
                            </FormControl>

                            <Button variant="contained"
                            color="primary"
                            type="submit">
                                Update Group
                            </Button> 
                        </form>
                    </Grid>
                )
            })
        }
    }

    componentWillMount() {
        this.setAccountId();
    }

    componentDidMount() {
        this.loadAllGroups();
    }

    render() {
        return(
            <Grid container>
                
                {this.renderGroups()}
            </Grid>
        )
    }
}