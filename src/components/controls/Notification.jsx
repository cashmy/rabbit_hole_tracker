import React from 'react';
import { Alert, Snackbar} from '@mui/material';
import theme from '../../theme';


export default function Notification(props) {
    const { notify, setNotify } = props;


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (

        <Snackbar
            sx={{ top: theme.spacing(9) }}
            open={notify.isOpen}
            autoHideDuration={6000 | null}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
        >
            <Alert
                severity={notify.type || "info"}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}