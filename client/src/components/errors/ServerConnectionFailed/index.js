import React from 'react';

import '../style.scss'

const ServerConnectionFailed = () => {
    return (
        <div className="error">
            Oops! Unable to connect to the server. Please visit later
        </div>
    );
}

export default ServerConnectionFailed;
