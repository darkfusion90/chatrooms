import React from 'react';

import ProgressButton from '../ProgressButton'

const DeleteRoomButton = ({
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
                propsProgressInitial: { label: 'Delete Room', ...propsInit },
                propsProgressPending: { label: 'Deleting Room...', ...propsPending },
                propsProgressSuccess: { label: 'Room Deleted', ...propsSuccess },
                propsProgressFailure: { label: 'Error Deleting Room', ...propsFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default DeleteRoomButton;
