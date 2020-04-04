import React from 'react';
import { connect } from 'react-redux'

import AppContainer from './App-Container'
import { connectToServer } from '../../redux/actions/server-actions'
import { updateUser } from '../../redux/actions/user-actions';
import { fetchAllNotifications } from '../../redux/actions/notification-actions'

const AppRedux = ({ connectToServer, user, updateUser, fetchAllNotifications }) => {
    return (
        <AppContainer
            connectToServer={connectToServer}
            updateUser={updateUser}
            fetchAllNotifications={fetchAllNotifications}
            user={user}
        />
    )
}

const mapDispatchToProps = {
    connectToServer,
    updateUser,
    fetchAllNotifications
}

const mapStateToProps = (state) => {
    const { user } = state
    return { user: user && user.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRedux);
