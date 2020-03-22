import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default (props) => {

    const renderPopover = () => {
        return (
            <Popover>
                <Popover.Title as="h2">{props.title}</Popover.Title>
                <Popover.Content>
                    {props.menu}
                </Popover.Content>
            </Popover>
        )
    }

    return (
        <OverlayTrigger
            trigger="click"
            placement="bottom"
            rootClose={true}
            overlay={renderPopover()}
        >
            {props.triggerComponent}
        </OverlayTrigger>
    )
}