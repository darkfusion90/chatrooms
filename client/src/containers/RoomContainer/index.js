import React from 'react';

import Room from '../../components/Room';

class RoomContainer extends React.Component {

    render() {
        const content = this.props.open ? <Room {...this.props} /> : "";
        return (
            <>
                {content}
            </>
        );
    }
}

export default RoomContainer;
