import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import IconButton, { ICON_POS_LEFT } from './IconButton'

const PROGRESS_INITIAL = 0;
const PROGRESS_PENDING = 1;
const PROGRESS_SUCCESS = 2;
const PROGRESS_FAIL = 3;

const iconButtonConfig = {
    [PROGRESS_PENDING]: {
        icon: <Spinner animation='border' size='sm' />,
        variant: 'info',
        disabled: true,
        style: {
            cursor: 'not-allowed'
        }
    },
    [PROGRESS_SUCCESS]: {
        icon: <FontAwesomeIcon icon={faCheckCircle} />,
        variant: 'success',
        disabled: true,
        style: {
            cursor: 'not-allowed'

        }
    },
    [PROGRESS_FAIL]: {
        icon: <FontAwesomeIcon icon={faTimesCircle} />,
        variant: 'danger',
        disabled: true,
        style: {
            cursor: 'not-allowed'
        }
    }
}

const ProgressButton = ({
    progress,
    propsProgressInitial,
    propsProgressPending,
    propsProgressSuccess,
    propsProgressFailure,
    ...otherProps
}) => {
    if (progress === PROGRESS_INITIAL) {
        const { label } = propsProgressInitial
        return <Button {...propsProgressInitial} {...otherProps}>{label}</Button>
    }

    const mapProgressToProps = () => {
        switch (progress) {
            case PROGRESS_INITIAL: return propsProgressInitial;
            case PROGRESS_PENDING: return propsProgressPending;
            case PROGRESS_SUCCESS: return propsProgressSuccess;
            case PROGRESS_FAIL: return propsProgressFailure;
            default: return {}
        }
    }

    const progressProps = mapProgressToProps()
    return (
        <IconButton
            iconPos={ICON_POS_LEFT}
            {...iconButtonConfig[progress]}
            {...progressProps}
            {...otherProps}
        >
            {progressProps.label}
        </IconButton>
    )
}

export {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
}

export default ProgressButton