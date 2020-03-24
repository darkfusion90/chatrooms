import React from 'react'
import { Button } from 'react-bootstrap'

import { WithModalTrigger } from '../../hoc'

export default ({ component, children, room, ...rest }) => {
    return (
        <WithModalTrigger
            modalName='DeleteRoom'
            modalProps={{ room }}
            component={component || Button}
            variant='danger'
            {...rest}
        >
            {children}
        </WithModalTrigger>
    )
}