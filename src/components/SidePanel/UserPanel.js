import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';

class UserPanel extends Component {

    dropDownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>User</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span>Sign Out</span>
        }
    ]

    render() {
        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                    <Header inverted floated="left" as="h2">
                        <Header.Content>
                            <Icon name="code" />
                            React Chat
                        </Header.Content>
                    </Header>
                </Grid.Row>

                <Header style={{ padding: '0.25em' }} as="h4" inverted>
                    <Dropdown trigger={
                        <span>User</span>
                    } options={
                        this.dropDownOptions()
                    } />
                </Header>
            </Grid>
        );
    }
}

export default UserPanel;