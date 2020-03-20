import React from 'react'
import { useHistory } from 'react-router-dom'

export default (props) => {
    const { to, shouldUseReplace, componentProps, content, component, ...rest } = props
    const Component = component

    const history = useHistory()
    const onClick = () => {
        return shouldUseReplace ? history.replace(to) : history.push(to)
    }

    return (
        <Component
            onClick={onClick}
            {...componentProps}
            {...rest}
        >
            {content}
        </Component>
    )
}