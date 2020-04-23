import React from 'react';
import { connect } from 'react-redux'

import RoomJoinRequestListContainer from './RoomJoinRequestList-Container'
import { setDocumentTitle } from '../../redux/actions/helmet-actions'


const RoomJoinRequestListRedux = (props) => {
    return <RoomJoinRequestListContainer {...props} />
}


const mapStateToProps = (state) => {
    const { user } = state
    return { currentUserId: user.user && user.user._id }
}


export default connect(
    mapStateToProps,
    { setDocumentTitle }
)(RoomJoinRequestListRedux);
