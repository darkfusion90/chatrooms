import React from 'react'
import Container from 'react-bootstrap/Container'

import CreateRoomButton from '../../CreateRoomButton'
import JoinRoomButton from '../../JoinRoomButton'

const EmptyRoomList = () => {
    return (
        <Container className='centered-content compensate-header'>
            <h1 className='title'>There are no public rooms available</h1>
            <Container style={{textAlign: 'center'}} className='subtitle'>
                <span>You could</span>
                <Container style={{ display: 'inline' }}>
                    <CreateRoomButton size='sm' variant='outline-primary'/>
                </Container>
                <span>or</span>
                <Container style={{ display: 'inline' }}>
                    <JoinRoomButton label='Join a Room using ID' size='sm' variant='outline-primary'/>
                </Container>
            </Container>
        </Container>
    )
}

export default EmptyRoomList