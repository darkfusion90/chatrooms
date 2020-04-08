import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import './GenericToast-Style.scss'

const GenericToast = ({ header, body, onClose, show, ...props }) => {
    const eightSeconds = 8000
    const onToastClose = onClose || function () { }
    return (
        <Toast
            show={show}
            autohide={true}
            delay={eightSeconds}
            onClose={onToastClose}
            {...props}
        >
            <ToastHeader closeButton={false} className='toast-header-custom'>
                <div className='d-flex justify-content-between w-100 p-0 m-0'>
                    <div>{header}</div>
                    <div className='m-0 p-0 cursor-pointer'>
                        <FontAwesomeIcon
                            icon={faWindowClose}
                            onClick={onToastClose}
                        />
                    </div>
                </div>
            </ToastHeader>
            <ToastBody>{body}</ToastBody>
        </Toast>
    )
}

export default GenericToast;
