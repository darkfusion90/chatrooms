import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import RoomsNavDropdown from '../RoomsNavDropdown'
import IconButton, { ICON_POS_RIGHT } from '../../../standalone/IconButton'
import { Dropdown } from '../../../standalone'


const RoomsNavItemView = () => {

    const getRoomsIcon = () => {
        const CaretIcon = <FontAwesomeIcon icon={faCaretDown} />

        return (<IconButton
            icon={CaretIcon}
            iconPos={ICON_POS_RIGHT}
            variant='outline-primary'
        >
            Rooms
        </IconButton>
        )
    }

    return (
        <Dropdown
            menu={<RoomsNavDropdown />}
            menuParentProps={{ className: 'px-0' }}
            triggerComponent={getRoomsIcon()}
        />
    )
}


export default RoomsNavItemView
