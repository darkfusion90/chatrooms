import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const ICON_POS_LEFT = 0;
const ICON_POS_RIGHT = 1;

const IconButton = ({ icon, iconPos, children, ...rest }) => {
    return (
        <Button {...rest}>
            <Row>
                {iconPos === ICON_POS_LEFT ? <Col>{icon}</Col> : null}
                <Col style={{ paddingLeft: 0, whiteSpace: 'nowrap' }}>
                    {children}
                </Col>
                {iconPos === ICON_POS_RIGHT ? <Col>{icon}</Col> : null}
            </Row>
        </Button>
    )
}

export { ICON_POS_RIGHT, ICON_POS_LEFT }
export default IconButton;
