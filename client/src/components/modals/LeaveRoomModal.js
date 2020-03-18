import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import GenericModal from './GenericModal';
import ButtonWithLeadingIcon from '../ButtonWithLeadingIcon'

import hideModal from '../../actions/hideModal';
import leaveRoom from '../../actions/leaveRoom';

class LeaveRoomModal extends React.Component {
    state = { leaveRoomStatus: 'initial' }

    onLeaveRoomSuccess = () => {
        this.setState({ leaveRoomStatus: 'success' })
    }

    onLeaveRoomFail = ({response}) => {
        console.log('fail: ', response)
        this.setState({ leaveRoomStatus: 'fail' })
    }

    onLeaveRoomButtonClick = (e) => {
        e.preventDefault();
        const { room } = this.props.modalProps
        if (!room) {
            this.setState({ leaveRoomStatus: 'fail' })
        }

        this.setState({ leaveRoomStatus: 'pending' })
        this.props.leaveRoom(room, this.onLeaveRoomSuccess, this.onLeaveRoomFail)
    }

    onCancelButtonClick = () => {
        this.props.hideModal();
    }

    getLeaveRoomButtonMeta() {
        const { deleteRoomForm } = this.props
        const syncErrors = deleteRoomForm ? deleteRoomForm.syncErrors : null
        const hasErrors = syncErrors && syncErrors.roomName

        switch (this.state.leaveRoomStatus) {
            case 'initial':
                return {
                    variant: 'danger',
                    disabled: hasErrors,
                    style: {
                        cursor: hasErrors ? 'not-allowed' : 'pointer'
                    },
                    onClick: this.onLeaveRoomButtonClick
                }
            case 'pending':
                return {
                    variant: 'info',
                    disabled: true,
                    style: {
                        cursor: 'not-allowed'
                    }
                }
            case 'success':
                return {
                    variant: 'success',
                    disabled: true,
                    style: {
                        cursor: 'not-allowed'
                    }
                }
            case 'fail':
                return {
                    variant: 'danger',
                    disabled: true,
                    style: {
                        cursor: 'not-allowed'
                    }
                }
            default:
                return null
        }
    }

    getPropsForButtonWithLeadingIcon = () => {
        let icon, content
        switch (this.state.leaveRoomStatus) {
            case 'pending':
                icon = <Spinner animation='border' size='sm' />
                content = 'Leaving Room...'
                break;
            case 'success':
                icon = <FontAwesomeIcon icon={faCheckCircle} />
                content = 'Left Room'
                break;
            case 'fail':
                icon = <FontAwesomeIcon icon={faTimesCircle} />
                content = 'Error Leaving Room'
                break;
            default:
                return {}
        }

        return { icon, content }
    }

    renderLeaveRoomButton() {
        const buttonProps = this.getLeaveRoomButtonMeta()
        const buttonWithLeadingIconProps = {
            ...this.getPropsForButtonWithLeadingIcon(),
            buttonProps
        }

        switch (this.state.leaveRoomStatus) {
            case 'initial':
                return <Button {...buttonProps}>Leave Room</Button>
            default:
                return <ButtonWithLeadingIcon  {...buttonWithLeadingIconProps} />
        }
    }

    getModalActions() {
        const { leaveRoomStatus } = this.state
        const taskCompleted = leaveRoomStatus === 'success' || leaveRoomStatus === 'fail'
        const cancelButtonText = taskCompleted ? 'Go Back' : 'Cancel'
        return (
            <>
                <Button variant='outline-secondary' onClick={this.onCancelButtonClick}>{cancelButtonText}</Button>
                {this.renderLeaveRoomButton()}
            </>
        )
    }

    getModalContent() {
        const { room } = this.props.modalProps
        const roomName = room ? room.name : '<unknown>'
        return (
            <p>Are you sure you want to leave the room{' '}
                <strong>{roomName}</strong>
                ?
            </p>
        )
    }

    render() {
        return (
            <GenericModal
                header="Leave Room"
                actions={this.getModalActions()}
                content={this.getModalContent()}
                visible={this.props.isModalVisible}
                hideModal={this.props.hideModal}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { modal } = state
    return {
        isModalVisible: modal.isModalOpen && modal.modalName === 'LeaveRoom',
        modalProps: modal.modalProps
    }
}

export default connect(
    mapStateToProps,
    { hideModal, leaveRoom }
)(LeaveRoomModal);

