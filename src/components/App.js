import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.scss';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

function App() {
  return (
    <div>
      <Grid columns="equal" className="app" style={{ background: '#eee' }}>
        <ColorPanel />
        <SidePanel />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>

        <Grid.Column style={{ marginLeft: 320 }}>
          <MetaPanel width={4} />
        </Grid.Column>
      </Grid>
    </div >
  );
}

export default App;
