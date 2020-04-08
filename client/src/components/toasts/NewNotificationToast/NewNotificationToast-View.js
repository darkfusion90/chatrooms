import React from 'react';

import GenericToast from '../GenericToast'

const NewNotificationToastView = ({ isToastVisible, onToastClose }) => {
    return (
        <GenericToast
            header='New Notification'
            body='You have a new notification'
            show={isToastVisible}
            onClose={onToastClose}
        />
    )
}

export default NewNotificationToastView;
