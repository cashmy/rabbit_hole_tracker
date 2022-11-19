
// #region [General imports]
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
// import Sheet from '@mui/Joy/Sheet';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import Controls from '../components/controls/Controls';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../theme';
import TextContrast from '../helpers/getTextContrast';
// #endregion

export default function PageDialog(props) {

  // #region [Local State]
  const { title, children, openPopup, setOpenPopup, fullWidth, titleColor, pageWidth } = props
  const [maxWidth, setMaxWidth] = React.useState(pageWidth || 'sm');
  // #endregion

  // * Event Handlers
  const handleClose = () => {
    setOpenPopup(false);
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth || true}
        maxWidth={maxWidth}
        open={openPopup}
        onClose={handleClose}
      >
        <DialogTitle display={'flex'}>
          <Paper
            sx={{
              padding: theme.spacing(1),
              marginRight: theme.spacing(3),
              backgroundColor: titleColor || "rgba(0, 0, 0, 0.2)",
              flexGrow: 1,
              mt: theme.spacing(2)
            }}
          >
            <Typography
              variant="h5"
              sx={{color: TextContrast.getTextContrast(titleColor || "rgba(0, 0, 0, 0.2)"),}}
            >
              {title || "Dialog Title"}
            </Typography>
          </Paper>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
            <Select
              sx={{ marginTop: theme.spacing(1) }}
              variant="filled"
              value={maxWidth}
              label="maxWidth"
              onChange={handleMaxWidthChange}
              inputProps={{
                name: 'max-width',
                id: 'max-width',
              }}
            >
              <MenuItem value={false}>false</MenuItem>
              <MenuItem value="xs">xs</MenuItem>
              <MenuItem value="sm">sm</MenuItem>
              <MenuItem value="md">md</MenuItem>
              <MenuItem value="lg">lg</MenuItem>
              <MenuItem value="xl">xl</MenuItem>
            </Select>
          </FormControl>
          <Controls.ActionButton color="secondary" onClick={handleClose}>
            <CloseIcon />
          </Controls.ActionButton>
        </DialogTitle>
        <DialogContent dividers>
          {children && children}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}