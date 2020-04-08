import React from 'react';
import { connect } from 'react-redux'

import AppContainer from './App-Container'
import { connectToServer } from '../../redux/actions/server-actions'
import { updateUser } from '../../redux/actions/user-actions';
import { fetchAllNotifications } from '../../redux/actions/notification-actions'
import { showNewNotificationToast } from '../../redux/actions/toast-actions'

const AppRedux = (props) => {
    return <AppContainer {...props} />
}

const mapDispatchToProps = {
    connectToServer,
    updateUser,
    fetchAllNotifications,
    showNewNotificationToast
}

const mapStateToProps = (state) => {
    const { user } = state
    return { user: user && user.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRedux);
