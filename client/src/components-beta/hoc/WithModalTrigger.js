import React from 'react'
import { connect } from 'react-redux'

import showModal from '../../actions/showModal'

const ModalTriggerEnhancer = (props) => {
    const { showModal, modalName, modalProps, content, componentProps } = props
    const Component = props.component
    return (
        <Component onClick={() => showModal(modalName, modalProps)} {...componentProps}>
            {content}
        </Component>
    )
}

export default connect(null, { showModal })(ModalTriggerEnhancer);

