import React from 'react';
import { connect } from 'react-redux'

import NewNotificationToastView from './NewNotificationToast-View'
import { hideToast } from '../../../redux/actions/toast-actions'

const TOAST_NAME = 'NewNotification'

const NewNotificationToastRedux = (props) => {
    const onToastClose = () => {
        props.hideToast(TOAST_NAME)
    }
    return <NewNotificationToastView {...props} onToastClose={onToastClose} />
}

const mapStateToProps = (state) => {
    return {
        isToastVisible: state.toast.activeToasts.includes(TOAST_NAME)
    }
}

export default connect(mapStateToProps, { hideToast })(NewNotificationToastRedux);
