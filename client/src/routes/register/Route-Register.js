import React from 'react'

import withLayout from '../../components-beta/hoc/WithLayout'
import Register from '../../components-beta/Register'

const RouteRegister = (props) => {
    return withLayout(<Register {...props} />)
}

export default RouteRegister