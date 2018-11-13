import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Button, FormControl, InputLabel, Input, Grid } from "@material-ui/core";
import APIURL from "../../helpers/environment"

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

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitUpdate = (event, id) => {
        event.preventDefault();
        let name = this.state.name
        let updatedGroup = { name }

        fetch(`${APIURL}/group/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")}` 
            },
            body: JSON.stringify(updatedGroup)
        }).then(response => response.json())
        .then(window.alert("Group Updated"))
    }

    loadAllGroups = () => {
        let accountId = this.state.accountId

        fetch(`${APIURL}/group/all/${accountId}`, {
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

    deleteGroup = (event, id) => {
        event.preventDefault();

        fetch(`${APIURL}/group/${id}`, {
            method: "DELETE",
            headers: new Headers({
                "Authorization": `Bearer ${localStorage.getItem("Token")}`
            })
        }).then(response => response.json())
        .then(window.alert("Group Deleted"))
    }

    renderGroups = () => {
        if (this.state.groups.length !== 0) {
            return this.state.groups.map((group, index) => {
                let id = group.id
                return (
                    <Grid item xs={12} key={index}>
                        <form onSubmit={(event) => this.onSubmitUpdate(event, id)}>
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

                        <br />

                        <Button variant="contained"
                        color="primary"
                        type="submit"
                        onClick={(event) => this.deleteGroup(event, id)}>
                            Delete Group
                        </Button>
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