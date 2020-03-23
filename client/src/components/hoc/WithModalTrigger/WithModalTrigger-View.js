import React from 'react'

const WithModalTriggerView = (props) => {
    const { showModal, modalName, modalProps, component, children, ...rest } = props
    const Component = component
    return (
        <Component onClick={() => showModal(modalName, modalProps)} {...rest}>
            {children}
        </Component>
    )
}

export default WithModalTriggerView

