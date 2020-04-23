import React from 'react'
import { Button } from 'react-bootstrap'


const RoomJoinRequestActions = ({ joinRequest, className }) => {
    const getActionText = () => {
        return joinRequest.status === 'initial' ? 'Unsend' : 'Remove'
    }

    return (
        <Button variant='outline-secondary' className={className}>
            {getActionText()}
        </Button>
    )
}

export default RoomJoinRequestActions