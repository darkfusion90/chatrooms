import React from 'react'

export default ({ navigate, ...rest }, Component) => {
    return <Component {...rest} />
}