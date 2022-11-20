import React, { useEffect } from "react";
import { Grid, useTheme } from '@mui/material';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../hooks/useForm';

const initialFValues = {
  id: 0,
  name: '',
  address: '',
}

// * Main component
const PageForm = (props) => {
  const theme = useTheme();
  const { addOrEdit, recordForEdit } = props;

  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name
        ? ""
        : "This field is required."
    if ('address' in fieldValues)
      temp.address = fieldValues.address
        ? ""
        : "This field is required."
    setErrors({
      ...temp
    })
    // Check that every item in the array has a blank result (no errors) else return false.
    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleToggleChange,
    resetForm,
  } = useForm(initialFValues);

  // SaveSubmit Callback handler - event driven
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate())
      addOrEdit(values, resetForm);
  };
  const handleReset = () => {
    if (recordForEdit == null)
      resetForm()
    else setValues({ ...recordForEdit })
  }
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      })
  }, [recordForEdit])


  return (
    <React.Fragment>
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controls.Input
              name="name"
              label="Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Input
              name="address"
              label="Address"
              value={values.address}
              onChange={handleInputChange}
              error={errors.address}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", marginTop: theme.spacing(2) }} >
            <Controls.Button
              type="submit"
              text="Submit"
              onClick={handleSubmit}
            />
            <Controls.Button
              color="secondary"
              text="Reset"
              onClick={handleReset}
            />
          </Grid>
        </Grid>
      </Form>
    </React.Fragment>

  )
}

export default PageForm;