import React from 'react';
import { connect } from 'react-redux'

import AppContainer from './App-Container'
import { connectToServer } from '../../redux/actions/server-actions'
import { updateUser } from '../../redux/actions/user-actions';
import { fetchAllNotifications } from '../../redux/actions/notification-actions'

const AppRedux = ({ connectToServer, updateUser, fetchAllNotifications }) => {
    return (
        <AppContainer
            connectToServer={connectToServer}
            updateUser={updateUser}
            fetchAllNotifications={fetchAllNotifications}
        />
    )
}

const mapDispatchToProps = {
    connectToServer,
    updateUser,
    fetchAllNotifications
}

const mapStateToProps = (state) => {
    //Even thought the following prop is never directly used in App component/container,
    //we need to map state.user so that on change in state.user, this component
    //will be re-rendered and the notifications, which are fetched in this component,
    //will be re-fetched using the updated user data
    return { user: state.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRedux);
