import React from 'react';
import { connect } from 'react-redux';

import App from '../../components/App';
import { onServerConnected, onServerDisconnected } from '../../server-communication/socketServer'
import connectToServer from '../../actions/connectToServer';
import updateUser from '../../actions/updateUser';
import createNotification from '../../actions/createNotification';

class AppContainer extends React.Component {
    state = {
        serverConnectionFailed: false
    }

    componentDidMount() {
        this.props.connectToServer(this.onServerConnectionFailed);
        onServerDisconnected(this.onServerDisconnected);
        onServerConnected(this.onServerConnected);
        this.props.updateUser()
    }

    onServerConnectionFailed = () => {
        this.setState({ serverConnectionFailed: true })
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
            <App {...this.state} />
        );
    }
}

export default connect(
    null,
    { connectToServer, createNotification, updateUser }
)(AppContainer);
