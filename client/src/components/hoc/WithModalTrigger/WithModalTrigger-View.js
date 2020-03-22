import React from 'react'

const WithModalTriggerView = (props) => {
    const { showModal, modalName, modalProps, content, componentProps, component, ...rest } = props
    const Component = component
    return (
        <Component onClick={() => showModal(modalName, modalProps)} {...componentProps} {...rest}>
            {content}
        </Component>
    )
}

export default WithModalTriggerView

