import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default (props) => {
    const { triggerComponent, label, id, ...rest } = props

    const renderTooltip = () => {
        return (
            <Tooltip id={id}>
                {label}
            </Tooltip>
        )
    }

    return (
        <OverlayTrigger
            trigger="hover"
            placement="bottom"
            rootClose={true}
            overlay={renderTooltip()}
            {...rest}
        >
            {triggerComponent}
        </OverlayTrigger>
    )
}