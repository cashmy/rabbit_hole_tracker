import React from 'react';
import { TextField } from "@mui/joy";

const Input = (props) => {
  const { name, label, value, size, error = null, onChange, ...other } = props;

  return (
    <TextField
      variant="soft"
      size={size || "sm"}
      label={label || "label"}
      name={name || "name"}
      value={value} 
    //   color={color || "primary"}
      onChange={onChange}
      fullWidth
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  );
};

export default Input;
