import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default ({ triggerComponent, label, id, ...rest }) => {
    
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