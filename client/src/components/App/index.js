import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';


import LandingPage from '../LandingPage';
import ServerConnectionFailed from '../ServerConnectionFailed'
import serverApi from '../../server-api';
import connectToServer from '../../actions/connectToServer';
import updateUserId from '../../actions/updateUserId';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from '../Header';

class App extends React.Component {
    state = {
        serverConnectionFailed: false
    }

    componentDidMount() {
        this.props.connectToServer(this.onServerConnectionFailed);
        serverApi.onUserIdRecieved((userId) => this.props.updateUserId(userId));
        serverApi.onRoomJoinRequestRecieved(whoSent => {
            console.log(whoSent + " wants to join your room")
            this.props.createNotification(
                "Room join request",
                whoSent + " wants to join your room",
                null,
                "")
        })
    }

    onServerConnectionFailed = () => {
        this.setState({ serverConnectionFailed: true })
    }

    renderAppBody() {
        if(this.state.serverConnectionFailed){
            return <ServerConnectionFailed />;
        }

        return (
            <BrowserRouter>
                <Route exact path="/" component={LandingPage} />
            </BrowserRouter>
        );
    }

    render() {
        console.log(this.props)
        return (
            <div className="app">
                <Header {...this.props} />
                {this.renderAppBody()}
            </div>
        );
    }
}

export default connect(
    null,
    { connectToServer, updateUserId }
)(App);
