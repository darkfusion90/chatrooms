import React from 'react';

import Modal from 'react-bootstrap/Modal';

const GenericModal = ({ visible, hideModal, header, content, actions }) => {
    return (
        <Modal
            show={visible}
            onHide={hideModal}
            centered
        >
            <Modal.Header closeButton onHide={hideModal}>
                <Modal.Title>
                    {header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
                {actions}
            </Modal.Footer>
        </Modal>
    )
}

export default GenericModal;
