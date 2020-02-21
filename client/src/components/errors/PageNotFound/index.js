import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import '../style.scss'

const PageNotFound = () => {
    return (
        <div className="error">
            Error 404: Page Not Found.
            <Link to="/">
                <Button>Home</Button>
            </Link>
        </div>
    );
}

export default PageNotFound;
