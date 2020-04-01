import React from 'react';

import AppView from './App-View'
import { onServerConnected, onServerDisconnected } from '../../server-communication/socketServer'

class AppContainer extends React.Component {
    state = {
        serverConnectionFailed: false
    }

    componentDidMount() {
        this.props.connectToServer(this.onServerDisconnected);
        onServerDisconnected(this.onServerDisconnected);
        onServerConnected(this.onServerConnected);
        this.props.updateUser()
        this.props.fetchAllNotifications()
    }
    
    onServerConnected = () => {
        this.setState({ serverConnectionFailed: false })
    }

    onServerDisconnected = () => {
        //TODO: Use redux store for this state as it affects the whole application
        this.setState({ serverConnectionFailed: true })
    }

    render() {
        return (
            <AppView {...this.state} />
        );
    }
}

export default AppContainer
