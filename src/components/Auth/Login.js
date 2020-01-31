import React, { Component } from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    hanldeInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
    }

    handleSubmit = event => {
        event.preventDefault();
        // if (this.isFormValid(this.state)) {

        this.setState({ errors: [], loading: true });
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedUser => {
                console.log(signedUser);
                this.setState({ loading: false });
            })
            .catch(err => {
                console.error(err);
                this.setState({ errors: this.state.errors.concat(err), loading: false });
            });
        // }
    }

    isFormValid = ({ email, password }) => email && password;

    render() {

        const { email, password, errors, loading } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login to React Chat
                </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="email" value={email}
                                className={this.hanldeInputError(errors, 'email')}
                            />

                            <Form.Input fluid name="password" icon="key" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" value={password}
                                className={this.hanldeInputError(errors, 'password')}
                            />

                            <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">Login</Button>

                            {errors.length > 0 && (
                                <Message color="red" >
                                    <Icon name="frown" />
                                    {this.displayErrors(errors)}
                                </Message>
                            )}

                            <Message>Don't have an account? <Link to="/register">Register</Link></Message>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;