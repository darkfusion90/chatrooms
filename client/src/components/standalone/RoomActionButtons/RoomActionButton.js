import React from 'react';

import ProgressButton from '../ProgressButton'

const RoomActionButton = ({
    progress,
    propsProgressInitial,
    propsProgressPending,
    propsProgressSuccess,
    propsProgressFailure,
    defaultProps,
    ...rest
}) => {

    const constructProps = () => {
        const propsInit = propsProgressInitial && { ...propsProgressInitial }
        const propsPending = propsProgressPending && { ...propsProgressPending }
        const propsSuccess = propsProgressSuccess && { ...propsProgressSuccess }
        const propsFailure = propsProgressFailure && { ...propsProgressFailure }
        return (
            {
                propsProgressInitial: { ...defaultProps.initial, ...propsInit },
                propsProgressPending: { ...defaultProps.pending, ...propsPending },
                propsProgressSuccess: { ...defaultProps.success, ...propsSuccess },
                propsProgressFailure: { ...defaultProps.failure, ...propsFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default RoomActionButton;
