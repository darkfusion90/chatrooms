import React from 'react'

import ProgressButtonInitial from './ProgressButtonInitial'
import ProgressButtonPending from './ProgressButtonPending'
import ProgressButtonSuccess from './ProgressButtonSuccess'
import ProgressButtonFailure from './ProgressButtonFailure'

const PROGRESS_INITIAL = 'prog_init'
const PROGRESS_PENDING = 'prog_pending'
const PROGRESS_SUCCESS = 'prog_success'
const PROGRESS_FAIL = 'prog_fail'

const ProgressButton = ({
    progress,
    propsProgressInitial,
    propsProgressPending,
    propsProgressSuccess,
    propsProgressFailure,
    ...otherProps
}) => {
    switch (progress) {
        case PROGRESS_INITIAL:
            return <ProgressButtonInitial {...propsProgressInitial} {...otherProps} />
        case PROGRESS_PENDING:
            return <ProgressButtonPending {...propsProgressPending} {...otherProps} />
        case PROGRESS_SUCCESS:
            return <ProgressButtonSuccess {...propsProgressSuccess} {...otherProps} />
        case PROGRESS_FAIL:
            return <ProgressButtonFailure {...propsProgressFailure} {...otherProps} />
        default: return <ProgressButtonInitial label='Click Here' {...otherProps} />
    }
}

export {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
}

export default ProgressButton