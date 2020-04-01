import React from 'react';

import ProgressButton from '../ProgressButton'

const  InviteUserButton = ({
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
                propsProgressInitial: { label: 'Send Invitation', ...propsInit },
                propsProgressPending: { label: 'Sending Invitation...', ...propsPending },
                propsProgressSuccess: { label: 'Invitation Sent', ...propsSuccess },
                propsProgressFailure: { label: 'Error Sending Invitation', ...propsFailure }
            }
        )
    }

    return <ProgressButton progress={progress} {...constructProps()} {...rest} />
}

export default  InviteUserButton;
