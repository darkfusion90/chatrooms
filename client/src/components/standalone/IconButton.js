import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const ICON_POS_LEFT = 0;
const ICON_POS_RIGHT = 1;

const IconButton = ({ icon, iconPos, children, childrenProps, ...rest }) => {
    const isIconLeft = iconPos === ICON_POS_LEFT
    return (
        <Button {...rest}>
            <Row>
                {isIconLeft ? <Col>{icon}</Col> : null}
                <Col
                    className={isIconLeft ? 'pl-0' : 'pr-0'}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {children}
                </Col>
                {iconPos === ICON_POS_RIGHT ? <Col>{icon}</Col> : null}
            </Row>
        </Button>
    )
}

export { ICON_POS_RIGHT, ICON_POS_LEFT }
export default IconButton;
