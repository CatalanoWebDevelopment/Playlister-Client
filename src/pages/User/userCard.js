import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "react-responsive-modal"

export default class UserCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };
    
    componentDidMount() {
        this.setState({ open: true })
    }

    render() {
        const { open } = this.state
        return(
            <Grid container spacing={12}>
                <button onClick={this.onOpenModal}>Open Modal</button>

                <Modal open={open} onClose={this.onCloseModal} center>
                    Hello World
                    {this.props.name}
                    {this.props.email}
                    {this.props.id}
                    {this.props.createdAt}
                </Modal>
            </Grid>
        )
    }
}
    