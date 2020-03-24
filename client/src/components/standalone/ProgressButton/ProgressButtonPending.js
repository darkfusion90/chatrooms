import React from 'react';
import { Spinner } from 'react-bootstrap'

import IconButton, { ICON_POS_LEFT } from '../IconButton'

const ProgressButtonInitial = ({ icon, iconPos, label, ...rest }) => {
    return (
        <IconButton
            icon={icon || <Spinner animation='border' size='sm' />}
            iconPos={iconPos || ICON_POS_LEFT}
            style={{ cursor: 'not-allowed' }}
            variant='info'
            disabled
            {...rest}
        >
            {label || 'Pending'}
        </IconButton>
    )
}

export default ProgressButtonInitial;
