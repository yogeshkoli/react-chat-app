import React, { Component } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';
import uuidv4 from 'uuid/v4';
import FileModal from './FileModal';
import ProgressBar from './ProgressBar';

class MessageForm extends Component {

    state = {
        storageRef: firebase.storage().ref(),
        uploadState: '',
        uploadTask: null,
        percentageUploaded: 0,
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

    createMessage = (fileUrl = null) => {
        let message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            }
        }

        if (fileUrl !== null) {
            message['image'] = fileUrl;
        }
        else {
            message['content'] = this.state.message;
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
                .set(this.createMessage())
                .then(() => {
                    this.setState({ loading: false, message: '', errors: [] });
                })
                .catch(err => {
                    console.log('handled error 1');
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
        const pathToUpload = this.state.channel.id;
        const ref = this.props.messagesRef;
        const filePath = `chat/public/${uuidv4()}.jpg`;

        this.setState({
            uploadState: 'uploading',
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        }, () => {
            this.state.uploadTask.on('state_changed', snap => {
                const percentageUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                this.setState({ percentageUploaded });
            },
                err => {
                    console.log('handled error 2');
                    console.error(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        uploadState: 'error',
                        uploadTask: null
                    });
                },
                () => {
                    this.state.uploadTask.snapshot.ref.getDownloadURL()
                        .then(downloadUrl => {
                            this.sendFileMessage(downloadUrl, ref, pathToUpload);
                        })
                        .catch(err => {
                            console.log('handled error 3');
                            console.error(err);
                            this.setState({
                                errors: this.state.errors.concat(err),
                                uploadState: 'error',
                                uploadTask: null
                            });
                        });
                });
        });
    }

    sendFileMessage = (fileUrl, ref, pathToUpload) => {
        ref.child(pathToUpload)
            .push()
            .set(this.createMessage(fileUrl))
            .then(() => {
                this.setState({ uploadState: 'done' })
            })
            .catch(err => {
                console.log('handled error 4');
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err)
                });
            });
    }

    render() {

        const { errors, message, loading, modal, uploadState, percentageUploaded } = this.state;

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
                        disabled={uploadState === 'uploading'}
                        onClick={this.openModal}
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />
                </Button.Group>

                <FileModal
                    modal={modal}
                    closeModal={this.closeModal}
                    uploadFile={this.uploadFile}
                />

                <ProgressBar uploadState={uploadState} percentageUploaded={percentageUploaded} />
            </Segment>
        );
    }
}

export default MessageForm;