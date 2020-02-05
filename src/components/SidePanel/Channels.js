import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';

class Channels extends Component {

    state = {
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelRef: firebase.database().ref('channels'),
        modal: false,

    }

    addChannel = () => {
        const { channelRef, channelName, channelDetails, user } = this.state;

        const key = channelRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        channelRef.child(key)
            .update(newChannel)
            .then(() => {
                this.setState({ channelName: '', channelDetails: '' });
                this.closeModal();
                console.log('channelAdded');
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addChannel();
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    render() {

        const { channels, modal } = this.state;

        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: '2em' }}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange" /> CHANNELS
                    </span>
                        {" "}
                        ({channels.length}) <Icon name="add" style={{ cursor: 'pointer' }} onClick={this.openModal} />
                    </Menu.Item>
                </Menu.Menu>

                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add a Channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input fluid label="Name of channel" name="channelName" onChange={this.handleChange} />
                            </Form.Field>

                            <Form.Field>
                                <Input fluid label="About the channel" name="channelDetails" onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button inverted color="green" onClick={this.handleSubmit}>
                            <Icon name="add" /> Add
                        </Button>

                        <Button inverted color="red" onClick={this.closeModal}>
                            <Icon name="remove" /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Channels;