import React from 'react';
import { connect } from 'react-redux';

import App from '../../components/App';
import serverApi from '../../server-api';
import connectToServer from '../../actions/connectToServer';
import updateUserId from '../../actions/updateUserId';
import createNotification from '../../actions/createNotification';

class AppContainer extends React.Component {
    state = {
        serverConnectionFailed: false
    }

    componentDidMount() {
        this.props.connectToServer(this.onServerConnectionFailed);
        serverApi.onServerDisconnected(this.onServerDisconnected);
        serverApi.onServerConnected(this.onServerConnected)
        serverApi.onRoomJoinRequestRecieved(whoSent => {
            console.log(whoSent + " wants to join your room")
            this.props.createNotification(
                "Room join request",
                whoSent + " wants to join your room",
                null)
        })
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
    { connectToServer, updateUserId, createNotification }
)(AppContainer);
