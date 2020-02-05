import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './App.scss';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

function App({ currentUser, currentChannel }) {
  return (
    <div>
      <Grid columns="equal" className="app" style={{ background: '#eee' }}>
        <ColorPanel />
        <SidePanel currentUser={currentUser} />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages currentChannel={currentChannel} />
        </Grid.Column>

        <Grid.Column width={4} >
          <MetaPanel />
        </Grid.Column>
      </Grid>
    </div >
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(App);
