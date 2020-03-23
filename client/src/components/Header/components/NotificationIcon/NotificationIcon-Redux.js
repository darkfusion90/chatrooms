import React from 'react';
import { connect } from 'react-redux';

import NotificationIconView from './NotificationIcon-View'

const NotificationIconRedux = ({ notifications }) => {
    return <NotificationIconView notifications={notifications} />
}

const mapStateToProps = (state) => {
    return { notifications: state.notifications }
}

export default connect(mapStateToProps)(NotificationIconRedux);
