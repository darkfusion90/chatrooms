import React from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ icon, to, replace, ...rest }) => {
    const history = useHistory()

    const onClick = () => {
        return replace ? history.replace(to) : history.push(to)
    }

    return <FontAwesomeIcon icon={icon} {...rest} onClick={onClick} />
}