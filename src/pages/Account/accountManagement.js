import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import jwt_decode from "jwt-decode"
import { Button } from "@material-ui/core";
import UserCard from "../User/userCard";

export default class AccountManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
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
                // return(
                //     <Grid item xs={4}>
                //         {console.log(user)}
                //         <UserCard email={user.email} name={user.name} id={user.id} createdAt={user.createdAt} />
                //     </Grid>
                // )
                this.setState({
                    users: [...this.state.users, user]
                })
            })
        })
    }

    componentDidMount() {
        this.loadUsers()
    }
    
    renderUsers = () => {
        // console.log(this.state.users.length)
        // if (this.state.users.length !== 0) {
            return this.state.users.map((user, index) => {
                console.log(user)
                return(
                    <div key={index}>
                    <UserCard email={user.email} name={user.name} id={user.id} createdAt={user.createdAt} />
                    </div>
                )
            })
        // }
    }
        
        render() {
            // console.log(this.state.users)
        return (
            <Grid container spacing={12}>
                {this.renderUsers()}
            </Grid>
        )
    }
}