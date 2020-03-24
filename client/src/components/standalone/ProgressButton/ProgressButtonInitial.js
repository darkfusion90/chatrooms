import React from 'react';
import { Button } from 'react-bootstrap'

const ProgressButtonInitial = ({ label, ...rest }) => {
    return <Button {...rest}>{label || 'Initial'}</Button>
}

export default ProgressButtonInitial;
