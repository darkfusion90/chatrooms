import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import RoomMenuDropdown from './RoomMenuDropdown'
import { Dropdown } from '../../../../standalone'


const RoomHeaderActionsMenuIconView = () => {
    return (
        <Dropdown
            triggerComponent={<FontAwesomeIcon icon={faEllipsisV} />}
            menu={<RoomMenuDropdown />}
            menuParentProps={{ className: 'px-0' }}
        />
    )
}

export default RoomHeaderActionsMenuIconView
