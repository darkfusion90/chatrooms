import React from 'react'

import withLayout from '../../components/hoc/WithLayout'
import Login from '../../components/Login'

const RouteLogin = (props) => {
    return withLayout(<Login {...props} />)
}

export default RouteLogin