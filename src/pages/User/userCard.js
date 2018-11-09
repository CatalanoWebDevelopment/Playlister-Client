import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "react-responsive-modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class UserCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            name: this.props.name,
            email: this.props.email
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };
    
    componentDidMount() {
        this.setState({ open: false })
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUpdate = event => {
        event.preventDefault();

        let id = this.props.id;
        let name = this.state.name;
        let email = this.state.email;
        let updatedUser = { name, email }

        fetch(`http://localhost:3000/user/${id}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SessionToken")}`
            }),
            body: JSON.stringify(updatedUser)
        }).then(response => response.json())
        .then(window.alert(`${name} Updated`))
        .then(this.props.refresh())
    }

    handleDelete = event => {
        event.preventDefault();
        let id = this.props.id;

        fetch(`http://localhost:3000/user/${id}`, {
            method: "DELETE",
            headers: new Headers({
                "Authorization": `Bearer ${localStorage.getItem("SessionToken")}`
            })
        }).then(response => response.json())
        .then(window.alert("User Deleted"))
    }

    render() {
        const { open } = this.state
        return(
            <Grid container spacing={12}>
                    <Button 
                        onClick={this.onOpenModal} color="primary" 
                        label={this.props.name}
                        variant="contained" 
                    >
                        {this.props.name}
                    </Button>

                    <Modal open={open} onClose={this.onCloseModal} center className="modal">
                                <h2>{this.props.name}</h2>
                                
                                <form onSubmit={this.handleUpdate}>
                                    <TextField label="Email" value={this.state.email} name="email" onChange={this.handleOnChange} />

                                    <br />

                                    <TextField label="Username" value={this.state.name} name="name" onChange={this.handleOnChange} />

                                    <br /><br />

                                    <Button variant="contained" color="primary" type="submit"
                                    className="styledButton"
                                    >
                                        Update User
                                    </Button>
                                </form>

                                <br />

                                <Button variant="contained" color="primary" type="submit" className="styledButton" onClick={this.handleDelete}>
                                    Delete User
                                </Button>
                    </Modal>
            </Grid>
        )
    }
}
    