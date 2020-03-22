import React from 'react'
import { connect } from 'react-redux'

import showModal from '../../actions/showModal'

const ModalTriggerEnhancer = (props) => {
    const { showModal, modalName, modalProps, content, componentProps, component, ...rest } = props
    const Component = component
    return (
        <Component onClick={() => showModal(modalName, modalProps)} {...componentProps} {...rest}>
            {content}
        </Component>
    )
}

export default connect(null, { showModal })(ModalTriggerEnhancer)

