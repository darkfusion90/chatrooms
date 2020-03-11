import React from 'react';
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import GenericModal from './GenericModal';
import DeleteRoomForm from '../forms/DeleteRoomForm';
import ButtonWithLeadingIcon from '../ButtonWithLeadingIcon'

import hideModal from '../../actions/hideModal';
import deleteRoom from '../../actions/deleteRoom'

class DeleteRoomModal extends React.Component {
    state = { deleteRoomStatus: 'initial' }

    onFormSubmit = (formValues) => {
        console.log('formValues: ', formValues)
        const { room } = this.props.modalProps
        if (!room) {
            this.setState({ deleteRoomStatus: 'fail' })
        }

        this.props.deleteRoom(room.roomId, this.onDeleteRoomSuccess, this.onDeleteRoomFail)
        this.setState({ deleteRoomStatus: 'pending' })
    }

    onDeleteRoomSuccess = () => {
        this.setState({ deleteRoomStatus: 'success' })
    }

    onDeleteRoomFail = ({ response }) => {
        console.log('fail: ', response)
        this.setState({ deleteRoomStatus: 'fail' })
    }

    onCancelButtonClick = () => {
        if (this.state.deleteRoomStatus === 'success') {
            this.props.onDeleteRoomSuccess()
        }

        this.props.hideModal();
    }

    getDeleteButtonMeta() {
        const { deleteRoomForm } = this.props
        const syncErrors = deleteRoomForm ? deleteRoomForm.syncErrors : null
        const hasErrors = syncErrors && syncErrors.roomName

        switch (this.state.deleteRoomStatus) {
            case 'initial':
                return {
                    variant: 'danger',
                    disabled: hasErrors,
                    style: {
                        cursor: hasErrors ? 'not-allowed' : 'pointer'
                    },
                    form: 'delete-room-form',
                    type: 'submit'
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
        switch (this.state.deleteRoomStatus) {
            case 'pending':
                icon = <Spinner animation='border' size='sm' />
                content = 'Deleting Room...'
                break;
            case 'success':
                icon = <FontAwesomeIcon icon={faCheckCircle} />
                content = 'Room Deleted'
                break;
            case 'fail':
                icon = <FontAwesomeIcon icon={faTimesCircle} />
                content = 'Room Deletion Failed'
                break;
            default:
                return {}
        }

        return { icon, content }
    }

    renderDeleteButton() {
        const buttonProps = this.getDeleteButtonMeta()
        const buttonWithLeadingIconProps = {
            ...this.getPropsForButtonWithLeadingIcon(),
            buttonProps
        }

        switch (this.state.deleteRoomStatus) {
            case 'initial':
                return <Button {...buttonProps}>Delete Room</Button>
            default:
                return <ButtonWithLeadingIcon  {...buttonWithLeadingIconProps} />
        }
    }

    getModalActions() {
        const { deleteRoomStatus } = this.state
        const taskCompleted = deleteRoomStatus === 'success' || deleteRoomStatus === 'fail'
        const cancelButtonText = taskCompleted ? 'Go Back' : 'Cancel'
        return (
            <>
                <Button variant='outline-secondary' onClick={this.onCancelButtonClick}>{cancelButtonText}</Button>
                {this.renderDeleteButton()}
            </>
        )
    }

    getModalContent() {
        const { room } = this.props.modalProps
        const roomName = room ? room.name : '<unknown>'
        return (
            <Row>
                <Col sm={12}>
                    <DeleteRoomForm onFormSubmit={this.onFormSubmit} room={room} />
                </Col>
                <Col>
                    To delete the room <strong>{roomName}</strong> type in the name of the room above
                </Col>
            </Row>
        )
    }

    render() {
        return (
            <GenericModal
                header="Delete Room"
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
        isModalVisible: modal.isModalOpen && modal.modalName === 'DeleteRoom',
        modalProps: modal.modalProps,
        deleteRoomForm: state.form.deleteRoomForm
    }
}

export default connect(
    mapStateToProps,
    { hideModal, deleteRoom }
)(DeleteRoomModal);

