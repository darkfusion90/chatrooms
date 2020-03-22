import React from 'react';
import { connect } from 'react-redux';

import AppContainer from './App-Container'
import connectToServerAction from '../../actions/connectToServer';
import updateUserAction from '../../actions/updateUser';

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
