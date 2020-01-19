import React from 'react';

import './ServerConnectionFailed.scss'

const ServerConnectionFailed = () => {
    console.log('component connection failed')
    return (
        <div className="connection-failed">
            Oops! Unable to connect to the server. Please visit later
        </div>
    );
}

export default ServerConnectionFailed;
