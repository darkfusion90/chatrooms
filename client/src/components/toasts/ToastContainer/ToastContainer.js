import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import NewNotificationToast from '../NewNotificationToast'
import { useNotificationAlert } from '../../hooks'
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
    const prevActiveToastsRef = useRef(activeToasts)
    // eslint-disable-next-line no-unused-vars
    const [_, setNotificationAlertPlaying] = useNotificationAlert()
    useEffect(() => {
        if (activeToasts.length > 0 && activeToasts.length !== prevActiveToastsRef) {
            console.log('will use sound')
            setNotificationAlertPlaying(true)
        }
        return () => setNotificationAlertPlaying(false)
    }, [activeToasts, setNotificationAlertPlaying])

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
