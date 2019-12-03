import React from 'react';
import { connect } from 'react-redux';

import ChatWindow from './ChatWindow';
import connectToServer from '../actions/connectToServer';

class App extends React.Component {
    componentDidMount() {
        this.props.connectToServer("http://localhost:8000");
    }

    render() {
        return (
            <div className="ui container">
                <ChatWindow />
            </div>
        );
    }
}

export default connect(
    null,
    { connectToServer }
)(App);
