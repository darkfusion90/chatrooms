import React from 'react'

import LandingPage from '../../components/LandingPage'
import withLayout from '../../components/hoc/WithLayout'

const RouteRoot = (props) => {
    return withLayout(<LandingPage {...props} />)
}

export default RouteRoot