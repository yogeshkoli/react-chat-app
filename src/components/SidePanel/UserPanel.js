import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';

class UserPanel extends Component {

    state = {
        user: this.props.currentUser
    }

    dropDownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.hanelSignOut}>Sign Out</span>
        }
    ]

    hanelSignOut = () => {
        firebase.auth().signOut().then(() => console.log('user signout'));
    }

    render() {

        const { user } = this.state;

        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                    <Header inverted floated="left" as="h2">
                        <Header.Content>
                            <Icon name="code" />
                            React Chat
                        </Header.Content>
                    </Header>

                    <Header style={{ padding: '0.25em' }} as="h4" inverted>
                        <Dropdown trigger={
                            <span>
                                <Image src={user.photoURL} avatar spaced="right" />
                                {user.displayName}
                            </span>
                        } options={
                            this.dropDownOptions()
                        } />
                    </Header>
                </Grid.Row>
            </Grid>
        );
    }
}

export default UserPanel;