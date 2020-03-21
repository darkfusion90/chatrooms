import React from 'react';

import DeleteRoomModalRedux from './DeleteRoomModal-Redux'
import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'


class DeleteRoomModalContainer extends React.Component {
    state = { deleteRoomProgress: PROGRESS_INITIAL }

    onDeleteRoomPending = () => {
        this.setState({ deleteRoomProgress: PROGRESS_PENDING })
    }

    onDeleteRoomSuccess = () => {
        this.setState({ deleteRoomProgress: PROGRESS_SUCCESS })
    }

    onDeleteRoomFail = () => {
        this.setState({ deleteRoomProgress: PROGRESS_FAIL })
    }

    render() {
        return (
            <DeleteRoomModalRedux
                onDeleteRoomPending={this.onDeleteRoomPending}
                onDeleteRoomSuccess={this.onDeleteRoomSuccess}
                onDeleteRoomFail={this.onDeleteRoomFail}
                {...this.state}
            />
        );
    }
}

export default DeleteRoomModalContainer