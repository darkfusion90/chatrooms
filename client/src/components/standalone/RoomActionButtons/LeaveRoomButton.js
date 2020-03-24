import React from 'react';

import ProgressButton from '../ProgressButton'

const LeaveRoomButton = ({
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
                propsProgressInitial: { label: 'Leave Room', ...propsInit },
                propsProgressPending: { label: 'Leaving Room...', ...propsPending },
                propsProgressSuccess: { label: 'Room Left', ...propsSuccess },
                propsProgressFailure: { label: 'Error Leaving Room', ...propsFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default LeaveRoomButton;
