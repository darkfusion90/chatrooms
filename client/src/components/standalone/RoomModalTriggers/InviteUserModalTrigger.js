import React from 'react'
import { Button } from 'react-bootstrap'

import { WithModalTrigger } from '../../hoc'


export default ({ component, room, children, ...rest }) => {
    return (
        <WithModalTrigger
            modalName='InviteUser'
            component={component || Button}
            modalProps={{ room }}
            {...rest}
        >
            {children}
        </WithModalTrigger>
    )
}