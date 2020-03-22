import React from 'react';
import { connect } from 'react-redux';

import UserIconView from './UserIcon-View'
import { logoutUser as logoutUserAction } from '../../../../redux/actions/user-actions'

const UserIconRedux = ({ username, logoutUser }) => {
    return <UserIconView username={username} logoutUser={logoutUser} />
}

const mapStateToProps = (state) => {
    const { user } = state
    return { username: user.user && user.user.username }
}

export default connect(mapStateToProps, { logoutUser: logoutUserAction })(UserIconRedux);