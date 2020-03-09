import React from 'react';

import Modal from 'react-bootstrap/Modal';

const GenericModal = (props) => {
    return (
        <Modal
            show={props.visible}
            onHide={props.hideModal}
            centered
        >
            <Modal.Header closeButton onHide={props.hideModal}>
                <Modal.Title>
                    {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.content}
            </Modal.Body>
            <Modal.Footer>
                {props.actions}
            </Modal.Footer>
        </Modal>
    )
}

export default GenericModal;
