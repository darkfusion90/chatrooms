import React from 'react';

import ProgressButton from '../ProgressButton'

const AcceptRoomInvitationButton = ({
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
                propsProgressInitial: { label: 'Accept', ...propsInit },
                propsProgressPending: { label: 'Accepting Invitation...', ...propsPending },
                propsProgressSuccess: { label: 'Accepted', ...propsSuccess },
                propsProgressFailure: { label: 'Error Accepting Invitation', ...propsFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default AcceptRoomInvitationButton;
