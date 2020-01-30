import React from 'react';
import clsx from 'clsx';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    }
}));

const iconVariants = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export default (props) => {
    if (!props.show) {
        //relying on snackbar to "not show" according to props.show introduced latency in hiding the snackbar
        //Hence, simply returning null when not showing snackbar.
        //However, do not remove "open" attribute from Snackbar 
        //as it is false by default which will always hide the Snackbar
        return null;
    }

    const styleClasses = useStyles();
    const Icon = iconVariants[props.variant];
    return (
        <Snackbar
            open={props.show}
            autoHideDuration={props.autoHideDuration || 3000}
            onClose={props.onClose}
        >
            <SnackbarContent
                className={clsx(styleClasses[props.variant])}
                message={
                    <span className={styleClasses.message}>
                        <Icon className={clsx(styleClasses.icon, styleClasses.iconVariant)} />
                        {props.message}
                    </span>
                }
                action={props.actions}
            />
        </Snackbar>
    );
}
