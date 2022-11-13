import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, useTheme } from '@mui/material';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import {Button} from './Button'


export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const theme = useTheme();

    return (
        <Dialog
            sx={{
                padding: theme.spacing(2),
                position: 'absolute',
                top: theme.spacing(6),
            }}
            open={confirmDialog.isOpen}
        >
            <DialogTitle sx={{ textAlign: 'center' }}>
                <IconButton
                    sx={{
                        color: theme.palette.secondary.main,
                        '& hover': {
                            color: theme.palette.secondary,
                            cursor: 'default',
                        },
                        '& .MuiSvgIcon-root': {
                            fontSize: '8rem',
                        }
                    }}
                    disableRipple
                    size="large"
                >
                    <NotListedLocationIcon />
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
                <Button
                    text="No"
                    color="primary"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                />
                <Button
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    );
}