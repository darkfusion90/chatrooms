import React from 'react'
import { Button } from 'react-bootstrap'

import { WithModalTrigger } from '../../hoc'

export default ({ component, children, ...rest }) => {
    return (
        <WithModalTrigger
            modalName='JoinRoom'
            component={component || Button}
            {...rest}
        >
            {children}
        </WithModalTrigger>
    )
}