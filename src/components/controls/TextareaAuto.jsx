import TextareaAutosize from '@mui/base/TextareaAutosize';
import { FormControl, FormLabel, FormHelperText } from '@mui/material'

const TextareaAuto = (props) => {
  const { name, label, value, error = null, onChange, ...other } = props;

  return (
    <FormControl 
      variant = "outlined" 
      fullWidth
      {...(error && { error: true }) } 
    >
      <TextareaAutosize
        label={label || "label"}
        placeholder={label || "label"}
        name={name || "name"}
        aria-label={name || "name"}
        value={value}
        onChange={onChange}
        fullWidth
        {...(error && { error: true, helperText: error })}
        {...other}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl >
  );
};

export default TextareaAuto;
