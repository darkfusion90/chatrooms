import React from 'react'

import LandingPage from '../../components-beta/LandingPage'
import withLayout from '../../components-beta/hoc/WithLayout'

const RouteRoot = (props) => {
    return withLayout(<LandingPage {...props} />)
}

export default RouteRoot