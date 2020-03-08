import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, Row, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { joinRoom } from '../../server-communication/httpServer'
import convertISODateToReadableString from '../../helpers/convertISODateToReadableString';
import RoomListItem from '../../components/RoomListItem'

class RoomListItemContainer extends React.Component {
    state = { joinRoomStatus: 'initial', joinRoomErrorMessage: null }

    onJoinButtonClick = () => {
        const { roomId } = this.props.room
        joinRoom(roomId,
            () => this.setState({ joinRoomStatus: 'success' }),
            ({ response }) => this.setState({ joinRoomStatus: 'fail', joinRoomErrorMessage: response.message })
        )
        this.setState({ joinRoomStatus: 'pending' })
    }

    disabledJoinButtonGridStyleTwoColsTemplate(leftCol, rightCol, variant) {
        return (
            <Button variant={variant} disabled={true}>
                <Row>
                    <Col>{leftCol}</Col>
                    <Col style={{ paddingLeft: 0, whiteSpace: 'nowrap' }}>
                        {rightCol}
                    </Col>
                </Row>
            </Button>
        )
    }

    determineJoinButtonMetadata() {
        let leftCol, rightCol, btnVariant = 'primary';

        if (this.state.joinRoomStatus === 'pending') {
            leftCol = <Spinner animation='border' size='sm' />
            rightCol = 'Joining...'
        } else if (this.state.joinRoomStatus === 'success') {
            leftCol = <FontAwesomeIcon icon={faCheckCircle} />
            rightCol = 'Joined'
            btnVariant = 'success'
        } else if (this.state.joinRoomStatus === 'fail') {
            leftCol = <FontAwesomeIcon icon={faTimesCircle} />
            rightCol = 'Join Failed'
            btnVariant = 'danger'
        }

        return { leftCol, rightCol, btnVariant }
    }

    getActionsForNonRoomMember() {
        console.log('status: ', this.state.joinRoomStatus)
        if (this.state.joinRoomStatus === 'initial') {
            return <Button onClick={this.onJoinButtonClick}>Join</Button>
        }

        const { leftCol, rightCol, btnVariant } = this.determineJoinButtonMetadata()
        return this.disabledJoinButtonGridStyleTwoColsTemplate(leftCol, rightCol, btnVariant)
    }

    getActionsForRoomMember(roomMember, roomId) {
        const adminActions = <Button variant='danger'>Delete</Button>

        const isRoomAdmin = (roomMember) => {
            return roomMember && roomMember.memberType === 'admin'
        }

        return (
            <ButtonGroup>
                <Link to={`/rooms/${roomId}`} component={Button}>Open</Link>
                {isRoomAdmin(roomMember) ? adminActions : null}
            </ButtonGroup>
        )
    }

    renderRoomActions() {
        const { room, currentUser } = this.props
        const getMemberRefInRoom = (room, queryUserId) => {
            return room.members.filter(roomMember => roomMember.user._id === queryUserId)
        }

        if (currentUser) {
            const currentUserRoomMemberReference = getMemberRefInRoom(room, currentUser._id)[0]
            if (!currentUserRoomMemberReference) {
                return this.getActionsForNonRoomMember()
            } else {
                return this.getActionsForRoomMember(currentUserRoomMemberReference, room.roomId)
            }
        }
    }

    renderRoomMetaData() {
        const { room } = this.props
        const roomOwner = room.createdBy
        const roomCreatedBy = roomOwner ? roomOwner.username : '<unknown>'
        const roomCreatedAt = convertISODateToReadableString(room.createdAt)

        return `Created ${roomCreatedAt} by ${roomCreatedBy}`
    }

    renderComponentContent() {
        return (
            <Row>
                <Col className='d-flex align-items-center'>
                    <Card.Text>{this.renderRoomMetaData()}</Card.Text>
                </Col>
                <Col>
                    {this.renderRoomActions()}
                </Col>
            </Row>
        )
    }

    renderComponentTitle() {
        const { room } = this.props
        return <Link to={`/rooms/${room.roomId}`}>{room.name}</Link>
    }

    renderComponentFooter() {
        const errMsg = this.state.joinRoomErrorMessage
        if (!errMsg) {
            return null
        }
        return (
            <Row>
                <Col style={{ color: 'red' }}>
                    Room join failed {errMsg ? `:${errMsg}` : ''}
                </Col>
            </Row>
        )
    }

    render() {
        this.renderComponentFooter()
        return (
            <RoomListItem
                title={this.renderComponentTitle()}
                content={this.renderComponentContent()}
                footer={this.renderComponentFooter()}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { currentUser: state.user.user }
}

export default connect(mapStateToProps)(RoomListItemContainer);
