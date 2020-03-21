import React from 'react';

import LeaveRoomModalRedux from './LeaveRoomModal-Redux'
import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../../standalone/ProgressButton'

class LeaveRoomModalContainer extends React.Component {
    state = { leaveRoomProgress: PROGRESS_INITIAL }

    onLeaveRoomPending = () => {
        this.setState({ leaveRoomProgress: PROGRESS_PENDING })
    }

    onLeaveRoomSuccess = () => {
        this.setState({ leaveRoomProgress: PROGRESS_SUCCESS })
    }

    onLeaveRoomFail = () => {
        this.setState({ leaveRoomProgress: PROGRESS_FAIL })
    }

    render() {
        return (
            <LeaveRoomModalRedux
                onLeaveRoomPending={this.onLeaveRoomPending}
                onLeaveRoomSuccess={this.onLeaveRoomSuccess}
                onLeaveRoomFail={this.onLeaveRoomFail}
                {...this.state}
            />)
    }
}

export default LeaveRoomModalContainer