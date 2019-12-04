import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';


import LandingPage from '../LandingPage';
import serverApi from '../../server-api';
import connectToServer from '../../actions/connectToServer';
import updateUserId from '../../actions/updateUserId';

import './App.css';

class App extends React.Component {
    componentDidMount() {
        this.props.connectToServer("http://localhost:8000");
        serverApi.onUserIdRecieved((userId) => this.props.updateUserId(userId));
    }

    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <Route exact path="/" component={LandingPage} />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(
    null,
    { connectToServer, updateUserId }
)(App);
