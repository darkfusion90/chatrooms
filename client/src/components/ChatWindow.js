import React from 'react';

import ChatHistory from './ChatHistory/'
import MessageBox from './MessageBox';

class ChatWindow extends React.Component {
    render() {
        return (
            <div>
                <ChatHistory />
                <MessageBox />
            </div>
        );
    }
}

export default ChatWindow;
