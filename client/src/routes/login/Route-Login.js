import React from 'react'

import withLayout from '../../components-beta/hoc/WithLayout'
import Login from '../../components-beta/Login'

const RouteLogin = (props) => {
    return withLayout(<Login {...props} />)
}

export default RouteLogin