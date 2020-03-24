import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import IconButton, { ICON_POS_LEFT } from '../IconButton'

const ProgressButtonSuccess = ({ icon, iconPos, label, ...rest }) => {
    return (
        <IconButton
            icon={icon || <FontAwesomeIcon icon={faTimesCircle} />}
            iconPos={iconPos || ICON_POS_LEFT}
            style={{ cursor: 'not-allowed' }}
            variant='danger'
            disabled
            {...rest}
        >
            {label || 'Initial'}
        </IconButton>
    )
}

export default ProgressButtonSuccess;
