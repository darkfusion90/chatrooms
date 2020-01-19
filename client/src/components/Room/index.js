import React from 'react';

class Room extends React.Component {
    render() {
        return (
            <div>
                Hi! I am a room.
                My name is {this.props.name} and id is: <em>{this.props.id}</em>
            </div>
        );
    }
}

export default Room;
