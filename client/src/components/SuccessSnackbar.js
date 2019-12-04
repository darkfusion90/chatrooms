import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default (props) => {
    console.log('snack show ' + props.open)
    return (
        <Snackbar
            open={props.open}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            autoHideDuration={3000}
            onClose={props.onClose}
            message={
                <span style={{ display: "flex", alignItems: "center" }}>
                    <CheckCircleIcon style={{ fontSize: '20px', marginRight: "20px" }} />
                    {props.message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );
}