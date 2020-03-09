import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import ButtonWithLeadingIcon from '../../../components/ButtonWithLeadingIcon'
import { joinRoom } from '../../../server-communication/httpServer'

class RoomListItemActionsContainer extends React.Component {
    state = { joinRoomStatus: 'initial' }

    determineJoinButtonMetadata() {
        let icon, content, variant = 'primary';

        if (this.state.joinRoomStatus === 'pending') {
            icon = <Spinner animation='border' size='sm' />
            content = 'Joining...'
        } else if (this.state.joinRoomStatus === 'success') {
            icon = <FontAwesomeIcon icon={faCheckCircle} />
            content = 'Joined'
            variant = 'success'
        } else if (this.state.joinRoomStatus === 'fail') {
            icon = <FontAwesomeIcon icon={faTimesCircle} />
            content = 'Join Failed'
            variant = 'danger'
        }

        return { icon, content, variant }
    }

    onJoinButtonClick = () => {
        const onSuccess = () => {
            this.setState({ joinRoomStatus: 'success' })
        }

        const onFailure = ({ response }) => {
            this.setState({ joinRoomStatus: 'fail' })
            this.props.onError(response.message)
        }

        const { roomId } = this.props.room
        joinRoom(roomId, onSuccess, onFailure)
        this.setState({ joinRoomStatus: 'pending' })
    }

    getActionsForRoomMember(roomMember, roomId) {
        const adminActions = <Button variant='danger'>Delete</Button>

        const isRoomAdmin = (roomMember) => {
            return roomMember && roomMember.memberType === 'admin'
        }

        return (
            <ButtonGroup>
                <Link to={`/rooms/${roomId}`} component={Button}>Open</Link>
                {this.props.isUserLoggedIn && isRoomAdmin(roomMember) ? adminActions : null}
            </ButtonGroup>
        )
    }

    getActionsForNonRoomMember() {
        console.log('status: ', this.state.joinRoomStatus)
        if (this.state.joinRoomStatus === 'initial') {
            return <Button onClick={this.onJoinButtonClick}>Join</Button>
        }

        const { icon, content, variant } = this.determineJoinButtonMetadata()
        const buttonProps = { variant, disabled: true }
        return <ButtonWithLeadingIcon icon={icon} content={content} buttonProps={buttonProps} />
    }

    render() {
        const { room, currentUser } = this.props
        const getMemberRefInRoom = (room, queryUserId) => {
            return room.members.filter(roomMember => {
                return roomMember && roomMember.user && roomMember.user._id === queryUserId
            })
        }

        if (currentUser) {
            const currentUserRoomMemberReference = getMemberRefInRoom(room, currentUser._id)[0]
            if (!currentUserRoomMemberReference) {
                return this.getActionsForNonRoomMember()
            } else {
                return this.getActionsForRoomMember(currentUserRoomMemberReference, room.roomId)
            }
        }

        return <div>Hello World!</div>;
    }
}

const mapStateToProps = (state) => {
    return { currentUser: state.user.user, isUserLoggedIn: state.user.isLoggedIn }
}

export default connect(mapStateToProps)(RoomListItemActionsContainer);
