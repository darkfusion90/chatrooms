import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import TooltipWrapper from './TooltipWrapper'


const HelpIcon = ({ id, help, size }) => {
    const Icon = (
        <FontAwesomeIcon
            icon={faQuestionCircle}
            size={size}
            className='cursor-pointer'
        />
    )

    return (
        <TooltipWrapper
            id={id}
            label={help}
            triggerComponent={Icon}
        />
    )
}

HelpIcon.propTypes = {
    id: PropTypes.string.isRequired,
    help: PropTypes.string.isRequired,
    size: PropTypes.string
}


export default HelpIcon
