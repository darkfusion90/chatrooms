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
        return (
            {
                propsProgressInitial: { ...defaultProps.initial, ...propsProgressInitial },
                propsProgressPending: { ...defaultProps.pending, ...propsProgressPending },
                propsProgressSuccess: { ...defaultProps.success, ...propsProgressSuccess },
                propsProgressFailure: { ...defaultProps.fail, ...propsProgressFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default RoomActionButton;
