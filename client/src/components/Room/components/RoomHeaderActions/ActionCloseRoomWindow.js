import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import { IconText } from '../../../standalone'
import { WithLink } from '../../../hoc'


const ActionCloseRoomWindow = ({ component: Component, ...rest }) => {
    const ActionContent = (props) => {
        return (
            <Component {...props} {...rest}>
                <IconText icon={<FontAwesomeIcon icon={faWindowClose} />}>
                    Close Room Window
                </IconText>
            </Component>
        )
    }

    return (
        <WithLink to='/rooms' component={ActionContent} />
    )
}


export default ActionCloseRoomWindow
