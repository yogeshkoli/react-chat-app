import React, { Component } from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true });

        }
    }

    render() {

        const { email, password, errors, loading } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login to React Chat
                </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input fluid name="email" icon="user" iconPosition="left" placeholder="Email" onChange={this.handeChange} type="text" className={this.hanldeInputError(errors, 'email')} />

                            <Form.Input fluid name="password" icon="key" iconPosition="left" placeholder="Password" onChange={this.handeChange} type="password" className={this.hanldeInputError(errors, 'password')} />

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