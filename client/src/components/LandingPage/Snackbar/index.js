import React from 'react';

import SnackbarContainer from '../../SnackbarContainer';

const Snackbar = (props) => {
    return (
        <SnackbarContainer
            header={props.header}
            message={props.message}
            show={props.show}
            onClose={props.onSnackbarClose}
            variant={props.Variant}
            actions={props.actions}
            autoHideDuration={props.autoHideDuration || 3000} />
    );
}

export default Snackbar;
