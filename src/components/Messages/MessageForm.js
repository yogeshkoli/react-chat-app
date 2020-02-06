import React, { Component } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';
import FileModal from './FileModal';

class MessageForm extends Component {

    state = {
        message: '',
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: [],
        modal: false
    }

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    currentMessage() {
        const message = {
            content: this.state.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            }
        }

        return message;
    }

    sendMessage = () => {
        const { messagesRef } = this.props;
        const { message, channel } = this.state;

        if (message) {
            this.setState({ loading: true });
            messagesRef
                .child(channel.id)
                .push()
                .set(this.currentMessage())
                .then(() => {
                    this.setState({ loading: false, message: '', errors: [] });
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, errors: this.state.errors.concat(err) });
                });
        }
        else {
            this.setState({ loading: false, errors: this.state.errors.concat({ message: 'Add a message' }) });
        }

    }

    handleKeyDown = event => {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    uploadFile = (file, metadata) => {
        console.log(file, metadata);
    }

    render() {

        const { errors, message, loading, modal } = this.state;

        return (
            <Segment className="message__form">
                <Input
                    onChange={this.handleChange}
                    fluid
                    name="message"
                    style={{ marginBottom: '0.7em' }}
                    label={<Button icon="add" />}
                    labelPosition="left"
                    placeholder="Write your message"
                    className={errors.some(error => error.message.includes('message')) ? 'error' : ''}
                    value={message}
                    onKeyDown={this.handleKeyDown}
                />

                <Button.Group icon widths={2}>
                    <Button
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                        onClick={this.sendMessage}
                        disabled={loading}
                    />

                    <Button
                        onClick={this.openModal}
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />

                    <FileModal
                        modal={modal}
                        closeModal={this.closeModal}
                        uploadFile={this.uploadFile}
                    />
                </Button.Group>
            </Segment>
        );
    }
}

export default MessageForm;