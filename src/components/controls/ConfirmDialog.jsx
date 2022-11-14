import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import Controls from './Controls';
import theme from '../../theme';


export default function ConfirmDialog(props) {
    const { confirmDialog, setConfirmDialog } = props;

    return (
        <Dialog
            sx={{
                padding: theme.spacing(2),
                position: 'absolute',
                top: theme.spacing(6),
                borderRadius: '25px !important',
                '& .MuiDialog-paper': {
                    borderRadius: '12px',
                }
            }}
            open={confirmDialog.isOpen}
        >
            <DialogTitle sx={{ textAlign: 'center' }}>
                <IconButton
                    fontSize='lg'
                    color="error"
                    sx={{
                        '& .MuiSvgIcon-root': {
                            fontSize: '8rem',
                        }
                    }}
                    disableRipple
                >
                    <NotListedLocationIcon size="lg" />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }} >
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center'}}>
                <Controls.Button
                    text="No"
                    color="primary"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                />
                <Controls.Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    );
}