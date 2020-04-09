import React from 'react';

import AppView from './App-View'
import {
    onServerConnected,
    onServerDisconnected,
    onNewNotification
} from '../../server-communication/socketServer'

class AppContainer extends React.Component {
    state = {
        serverConnectionFailed: false
    }

    componentDidMount() {
        this.props.connectToServer(this.onServerDisconnected);
        onServerDisconnected(this.onServerDisconnected);
        onServerConnected(this.onServerConnected);
        onNewNotification(this.onNewNotification)
        this.props.updateUser()
        this.props.fetchAllNotifications()
    }

    componentDidUpdate(prevProps) {
        const prevUser = prevProps.user
        const currentUser = this.props.user
        //Prevent infinite re-rendering by checking if the user is same as before
        //If same, don't fetch the notifications
        if ((prevUser && prevUser._id) === (currentUser && currentUser._id)) {
            return
        }

        this.props.fetchAllNotifications()
    }

    onServerConnected = () => {
        this.setState({ serverConnectionFailed: false })
    }

    onServerDisconnected = () => {
        //TODO: Use redux store for this state as it affects the whole application
        this.setState({ serverConnectionFailed: true })
    }

    onNewNotification = () => {
        this.props.showNewNotificationToast()
        this.props.fetchAllNotifications()
    }

    render() {
        return <AppView {...this.state} {...this.props} />
    }
}

export default AppContainer
