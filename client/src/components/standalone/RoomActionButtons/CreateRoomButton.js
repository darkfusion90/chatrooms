import React from 'react';

import ProgressButton from '../ProgressButton'

const CreateRoomButton = ({
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
                propsProgressInitial: { label: 'Create Room', ...propsInit },
                propsProgressPending: { label: 'Creating Room...', ...propsPending },
                propsProgressSuccess: { label: 'Room Created', ...propsSuccess },
                propsProgressFailure: { label: 'Error Creating Room', ...propsFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default CreateRoomButton;
