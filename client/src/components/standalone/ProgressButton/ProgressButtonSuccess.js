import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import IconButton, { ICON_POS_LEFT } from '../IconButton'

const ProgressButtonSuccess = ({ icon, iconPos, label, ...rest }) => {
    return (
        <IconButton
            icon={icon || <FontAwesomeIcon icon={faCheckCircle} />}
            iconPos={iconPos || ICON_POS_LEFT}
            style={{ cursor: 'not-allowed' }}
            variant='success'
            disabled
            {...rest}
        >
            {label || 'Initial'}
        </IconButton>
    )
}

export default ProgressButtonSuccess;
