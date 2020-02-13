import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default (props) => {
    return (
        <Alert show={props.show} variant={props.variant} onClose={props.onDismiss} dismissible>
            <Alert.Heading>{props.heading}</Alert.Heading>
            <p>{props.body}</p>
        </Alert>
    )
}