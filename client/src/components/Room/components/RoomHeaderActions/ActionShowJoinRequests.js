import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import { IconText } from '../../../standalone'


const ActionShowJoinRequests = ({ component: Component, props }) => {
    return (
        <Component {...props}>
            <IconText icon={<FontAwesomeIcon icon={faUserPlus} />}>
                Join Requests
            </IconText>
        </Component>
    )
}

export default ActionShowJoinRequests
