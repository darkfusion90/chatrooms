import React from 'react';
import { connect } from 'react-redux'

import ChatWindowContainer from './ChatWindow-Container'
import { fetchRoomMessages } from '../../../../redux/actions/room-actions'

const ChatWindowRedux = ({ messages, fetchRoomMessages, roomId }) => {
    return <ChatWindowContainer
        roomId={roomId}
        messages={messages}
        fetchRoomMessages={fetchRoomMessages}
    />
}

const mapStateToProps = (state) => {
    return { messages: state.rooms.activeRoom.messages }
}

export default connect(mapStateToProps, { fetchRoomMessages })(ChatWindowRedux);
