import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import BootstrapTooltip from 'react-bootstrap/Tooltip';

const Tooltip = (props) => {
    const { triggerComponent, label, id } = props

    const renderTooltip = () => {
        return (
            <BootstrapTooltip id={id}>
                {label}
            </BootstrapTooltip>
        )
    }

    return (
        <OverlayTrigger
            trigger="hover"
            placement="bottom"
            rootClose={true}
            overlay={renderTooltip()}
        >
            {triggerComponent}
        </OverlayTrigger>
    )
}

const withTooltip = (component, { id, label }) => {
    return <Tooltip triggerComponent={component} label={label} id={id} key={id} />
}

export default Tooltip
export { withTooltip }