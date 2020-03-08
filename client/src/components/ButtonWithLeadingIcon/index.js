import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const ButtonWithLeadingIcon = ({ buttonProps, icon, content }) => {
    return (
        <Button {...buttonProps}>
            <Row>
                <Col>{icon}</Col>
                <Col style={{ paddingLeft: 0, whiteSpace: 'nowrap' }}>
                    {content}
                </Col>
            </Row>
        </Button>
    )
}

export default ButtonWithLeadingIcon;
