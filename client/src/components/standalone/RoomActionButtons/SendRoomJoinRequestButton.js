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
                propsProgressInitial: { label: 'Send Join Request', ...propsInit },
                propsProgressPending: { label: 'Sending Request...', ...propsPending },
                propsProgressSuccess: { label: 'Room Join Request Sent', ...propsSuccess },
                propsProgressFailure: { label: 'Error Sending Request', ...propsFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default LeaveRoomButton;
