import React from 'react';
import { connect } from 'react-redux';

import UserIconView from './UserIcon-View'
import logoutUserAction from '../../../../actions/logoutUser'

const UserIconRedux = ({ username, logoutUser }) => {
    return <UserIconView username={username} logoutUser={logoutUser} />
}

const mapStateToProps = (state) => {
    const { user } = state
    return { username: user.user && user.user.username }
}

export default connect(mapStateToProps, { logoutUser: logoutUserAction })(UserIconRedux);