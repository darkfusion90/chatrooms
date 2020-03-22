import React from 'react'
import { connect } from 'react-redux'

import showModal from '../../actions/showModal'

const ModalTriggerEnhancer = (props) => {
    const { showModal, modalName, content, componentProps } = props
    const Component = props.component
    return <Component onClick={() => showModal(modalName)} {...componentProps}>{content}</Component>
}

export default connect(null, { showModal })(ModalTriggerEnhancer);

