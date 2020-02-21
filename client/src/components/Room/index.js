import React from 'react';

const Room = (props) => {
    return (
        <div>
            Hi! I am a room
            Name: {props.room.name}
            Created: {props.room.createdAt}
        </div>
    );
}


export default Room;
