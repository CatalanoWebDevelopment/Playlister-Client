import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "react-responsive-modal";
import Button from "@material-ui/core/Button";

export default class UserCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true
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
                <Grid item xs={12}>
                    <Button 
                        onClick={this.onOpenModal} color="primary" 
                        label={this.props.name}
                        variant="contained" 
                    >
                        {this.props.name}
                    </Button>

                    <Modal open={open} onClose={this.onCloseModal} center>
                        {this.props.name}
                        {this.props.email}
                        {this.props.id}
                        {this.props.createdAt}
                    </Modal>
                </Grid>
            </Grid>
        )
    }
}
    