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
        buttonProps: {
            variant: 'info',
            disabled: true,
            style: {
                cursor: 'not-allowed'
            }
        }
    },
    [PROGRESS_SUCCESS]: {
        icon: <FontAwesomeIcon icon={faCheckCircle} />,
        buttonProps: {
            variant: 'success',
            disabled: true,
            style: {
                cursor: 'not-allowed'
            }
        }
    },
    [PROGRESS_FAIL]: {
        icon: <FontAwesomeIcon icon={faTimesCircle} />,
        buttonProps: {
            variant: 'danger',
            disabled: true,
            style: {
                cursor: 'not-allowed'
            }
        }
    }
}

const ProgressButton = ({ progress, buttonProps, ...otherProps }) => {
    if (progress === PROGRESS_INITIAL) {
        return <Button {...buttonProps}>{otherProps.labelProgressInitial}</Button>
    }

    const getProgressLabel = () => {
        const {
            labelProgressInitial,
            labelProgressPending,
            labelProgressSuccess,
            labelProgressFail,
        } = otherProps

        //eslint-disable-next-line
        switch (progress) {
            case PROGRESS_INITIAL: return labelProgressInitial;
            case PROGRESS_PENDING: return labelProgressPending;
            case PROGRESS_SUCCESS: return labelProgressSuccess;
            case PROGRESS_FAIL: return labelProgressFail;
        }
    }

    const { icon, ...restConfig } = iconButtonConfig[progress]
    return (
        <IconButton
            icon={icon}
            buttonProps={{ ...restConfig.buttonProps, ...buttonProps }}
            iconPos={ICON_POS_LEFT}
            content={getProgressLabel()}
        />
    )
}

export {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
}

export default ProgressButton