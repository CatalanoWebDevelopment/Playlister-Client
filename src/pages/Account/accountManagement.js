import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import jwt_decode from "jwt-decode"
import UserCard from "../User/userCard";

export default class AccountManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            refresh: false
        }
    }

    loadUsers = () => {
        let token = localStorage.getItem('SessionToken')
        let accountId = jwt_decode(token).accountId

        fetch(`http://localhost:3000/user/all/${accountId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('SessionToken')
            }
        })
        .then(response => response.json())
        .then(response => {
            response.users.map(user => {
                this.setState({
                    users: [...this.state.users, user]
                })
            })
        })
    }

    refreshPage = () => {
        if (this.state.refresh === false) {
            this.setState({
                refresh: true
            })
        } else {
            this.setState({
                refresh: false
            })
        }
    }

    componentDidMount() {
        this.loadUsers()
    }
    
    renderUsers = () => {
        if (this.state.users.length !== 0) {
            return this.state.users.map((user, index) => {
                return(
                    <Grid Container spacing={12}>
                    <Grid key={index} item xs={12} className="styledGrid">
                        <UserCard email={user.email} name={user.name} id={user.id} createdAt={user.createdAt} refresh={this.refreshPage}  />
                    </Grid>

                        <br />
                        <br /> 

                    </Grid>
                )
            })
        }
    }
        
    render() {
        return (
            <Grid container spacing={12}>
                {this.renderUsers()}
            </Grid>
        )
    }
}