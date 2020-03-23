import React from 'react'

import withLayout from '../../components/hoc/WithLayout'
import Register from '../../components/Register'

const RouteRegister = (props) => {
    return withLayout(<Register {...props} />)
}

export default RouteRegister