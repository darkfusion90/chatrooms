import React from 'react'
import { Button } from 'react-bootstrap'

import { WithModalTrigger } from '../../hoc'

export default ({ component, children, room, currentUserMemberId, ...rest }) => {
    return (
        <WithModalTrigger
            modalName='LeaveRoom'
            modalProps={{ room, currentUserMemberId }}
            component={component || Button}
            variant='danger'
            {...rest}
        >
            {children}
        </WithModalTrigger>
    )
}