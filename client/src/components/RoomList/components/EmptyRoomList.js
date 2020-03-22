import React from 'react'
import Container from 'react-bootstrap/Container'

const EmptyRoomList = () => {
    return (
        <Container className='centered-content compensate-header'>
            <h1 className='title'>There are no public rooms available</h1>
            <Container style={{ textAlign: 'center' }} className='subtitle'>
                <span>You could</span>
                <Container style={{ display: 'inline' }}>
                </Container>
                <span>or</span>
                <Container style={{ display: 'inline' }}>
                </Container>
            </Container>
        </Container>
    )
}

export default EmptyRoomList