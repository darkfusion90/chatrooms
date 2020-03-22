import React from 'react';
import { connect } from 'react-redux';

import AppContainer from './App-Container'
import { connectToServer as connectToServerAction } from '../../redux/actions/server-actions'
import { updateUser as updateUserAction } from '../../redux/actions/user-actions';

const AppRedux = ({ connectToServer, updateUser }) => {
    return (
        <AppContainer
            connectToServer={connectToServer}
            updateUser={updateUser}
        />
    )
}

const mapDispatchToProps = {
    connectToServer: connectToServerAction,
    updateUser: updateUserAction
}

export default connect(null, mapDispatchToProps)(AppRedux);
