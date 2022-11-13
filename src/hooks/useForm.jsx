import { useState } from "react";
import { Box } from '@mui/joy';

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const handleToggleChange = (event) => {
    const { name } = event.target;
    const value = event.target.checked;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleToggleChange,
    resetForm,
  };
}

export function Form(props) {
  const { children, ...other } = props;
  return (
    <Box
      autoComplete="off"
      {...other}
    >
      {props.children}
    </Box>
  );
}
