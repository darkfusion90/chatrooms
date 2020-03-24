import React from 'react'
import { ButtonGroup, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadCry } from '@fortawesome/free-solid-svg-icons'

const RoomNotJoinedView = ({ room }) => {
    if (!room) return null

    const isPrivateRoom = room.type === 'private'
    const possibleActionText = isPrivateRoom ? 'send a join request' : 'join the room'

    return (
        <Container fluid>
            <FontAwesomeIcon icon={faSadCry} size='lg' />
            <p>You are not a member of this room</p>
            <p>To access, you must {possibleActionText}</p>
            <ButtonGroup>
                {isPrivateRoom ? <div>Send a request</div> : <div>Join Room</div>}
            </ButtonGroup>
        </Container>
    )
}
    
export default RoomNotJoinedView