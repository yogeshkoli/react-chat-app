import React, { Component } from "react";
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {


    handeChange = () => {

    }

    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle" >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for React Chat
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handeChange} type="text" />

                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handeChange} type="email" />

                            <Form.Input fluid name="password" icon="password" iconPosition="left" placeholder="Password" onChange={this.handeChange} type="password" />

                            <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={this.handeChange} type="password" />

                            <Button color="orange" fluid size="large">Submit</Button>

                            <Message>Already a user? <Link to="/login">Login</Link></Message>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;