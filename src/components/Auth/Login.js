import React, { Component } from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {

    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="purple" textAlign="center">
                        <Icon name="puzzle piece" color="purple" />
                        Login for React Chat
                </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handeChange} type="text" />

                            <Form.Input fluid name="password" icon="key" iconPosition="left" placeholder="Password" onChange={this.handeChange} type="password" />

                            <Button color="purple" fluid size="large">Login</Button>

                            <Message>Do not have a account? <Link to="/register">Register</Link></Message>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;