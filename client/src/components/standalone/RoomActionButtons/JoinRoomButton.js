import React from 'react';

import ProgressButton from '../ProgressButton'

const JoinRoomButton = ({
    progress,
    propsProgressInitial,
    propsProgressPending,
    propsProgressSuccess,
    propsProgressFailure,
    ...rest
}) => {

    const constructProps = () => {
        const propsInit = propsProgressInitial && { ...propsProgressInitial }
        const propsPending = propsProgressPending && { ...propsProgressPending }
        const propsSuccess = propsProgressSuccess && { ...propsProgressSuccess }
        const propsFailure = propsProgressFailure && { ...propsProgressFailure }
        return (
            {
                propsProgressInitial: { label: 'Join Room', ...propsInit },
                propsProgressPending: { label: 'Joining Room...', ...propsPending },
                propsProgressSuccess: { label: 'Room Joined', ...propsSuccess },
                propsProgressFailure: { label: 'Error Joining Room', ...propsFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default JoinRoomButton;
