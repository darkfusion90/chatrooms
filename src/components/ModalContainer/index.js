import React from 'react';

import CreateRoomModal from '../modals/CreateRoomModal';
import JoinRoomModal from '../modals/JoinRoomModal';

const ModalContainer = (props) => {
    const getModal = (name) => {
        return name === 'create' ? <CreateRoomModal {...props} /> : <JoinRoomModal {...props} />
    }

    return getModal(props.name);
}

export default ModalContainer;
