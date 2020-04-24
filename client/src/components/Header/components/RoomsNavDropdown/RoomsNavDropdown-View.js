import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'


const DropdownLink = ({ to, children, ...props }) => {
    return (
        <Link
            to={to}
            className='text-decoration-none no-highlight-around-element'
            {...props}
        >
            {children}
        </Link>
    )
}

const LinkToPublicRooms = () => {
    return (
        <DropdownLink to='/rooms'>
            <ListGroup.Item>All Public Rooms</ListGroup.Item>
        </DropdownLink>
    )
}

const LinkToRoomJoinRequests = () => {
    return (
        <DropdownLink to='/rooms/join-requests'>
            <ListGroup.Item>Room Join Requests Sent</ListGroup.Item>
        </DropdownLink>
    )
}

const RoomsNavDropdownView = () => {
    return (
        <ListGroup variant='flush'>
            <LinkToPublicRooms />
            <ListGroup.Item>Your Rooms</ListGroup.Item>
            <LinkToRoomJoinRequests />
            <ListGroup.Item>Room Invitations Received</ListGroup.Item>            
        </ListGroup>
    )
}

export default RoomsNavDropdownView
