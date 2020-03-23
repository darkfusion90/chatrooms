import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default (props) => {
    const shouldShowDismissIcon = !props.dismissAction;
    return (
        <Alert show={props.show} variant={props.variant} onClose={props.onDismiss} dismissible={shouldShowDismissIcon}>
            <Alert.Heading>{props.heading}</Alert.Heading>
            <p>{props.body}</p>
            <div className='d-flex justify-content-end'>
                {props.dismissAction && props.dismissAction()}
            </div>
        </Alert>
    )
}