
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import { IconText } from '../../../standalone'


const ActionRoomInfo = ({ component: Component, ...props }) => {
    return (
        <Component {...props} >
            <IconText icon={<FontAwesomeIcon icon={faInfoCircle} />}>
                Room Info
            </IconText>
        </Component>
    )
}

export default ActionRoomInfo
