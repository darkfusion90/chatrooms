import React from 'react'
import { Button } from 'react-bootstrap'


const RoomJoinRequestActions = ({ joinRequest, className }) => {
    const getActionText = () => {
        switch (joinRequest.status) {
            case 'initial':
                return 'Unsend'
            case 'rejected':
                return 'Resend'
            case 'accepted':
            default:
                return 'Remove'
        }
    }

    return (
        <Button variant='outline-secondary' className={className}>
            {getActionText()}
        </Button>
    )
}

export default RoomJoinRequestActions