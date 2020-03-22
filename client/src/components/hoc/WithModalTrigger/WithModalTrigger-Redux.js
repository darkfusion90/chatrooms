import React from 'react'
import { connect } from 'react-redux'

import WithModalTriggerView from './WithModalTrigger-View'
import { showModal } from '../../../redux/actions/modal-actions'

const WithModalTriggerRedux = (props) => {
    return <WithModalTriggerView {...props} />
}

export default connect(null, { showModal })(WithModalTriggerRedux)

