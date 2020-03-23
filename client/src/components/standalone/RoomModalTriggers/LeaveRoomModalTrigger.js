import React from 'react'
import { Button } from 'react-bootstrap'

import { WithModalTrigger } from '../../hoc'

export default ({ component, children, room, ...rest }) => {
    return (
        <WithModalTrigger
            modalName='LeaveRoom'
            modalProps={room}
            component={component || Button}
            {...rest}
        >
            {children}
        </WithModalTrigger>
    )
}