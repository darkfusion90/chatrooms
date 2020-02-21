import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import '../style.scss'

const Forbidden = (props) => {
    const msg = props.msg || 'You do not have the permissions required to view this page'
    return (
        <div className="error">
            {msg}
            <Link to="/">
                <Button>Home</Button>
            </Link>
        </div>
    );
}

export default Forbidden;
