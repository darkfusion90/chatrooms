import React from 'react';
import { connect } from 'react-redux'

import RoomContainer from './Room-Container'

const RoomRedux = (props) => {
    return <RoomContainer {...props} />;
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.user && state.user.user
    }
}

export default connect(mapStateToProps)(RoomRedux)
