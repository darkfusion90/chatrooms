import React from 'react'
import { connect } from 'react-redux'

import NewNotificationToast from '../NewNotificationToast'
import './ToastContainer-Style.scss'

const renderToast = (toast) => {
    switch (toast) {
        case 'NewNotification':
            return <NewNotificationToast />
        default:
            return null
    }
}

const ToastContainer = ({ activeToasts }) => {
    return (
        <div className='toast-container'>
            {activeToasts.map(toast => renderToast(toast))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { activeToasts: state.toast.activeToasts }
}

export default connect(mapStateToProps)(ToastContainer);
