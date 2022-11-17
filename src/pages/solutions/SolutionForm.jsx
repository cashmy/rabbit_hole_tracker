import React, { useEffect } from "react";
import { Grid, useTheme } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../hooks/useForm';

const initialFValues = {
  id: 0,
  type: 's',
  description: '',
}

// * Main component
const SolutionForm = (props) => {
  const theme = useTheme();
  const { addOrEdit, recordForEdit } = props;

  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.type = fieldValues.type
      ? ""
      : "This field is required."
    temp.description = fieldValues.description
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

              <Controls.Select
              name="type"
              label="Type (s/r)"
              value={values.type}
              onChange={handleInputChange}
              error={errors.type}
              options={[
                  { id: "s", title: "Solution" },
                  { id: "r", title: "Redirect/Re-focus" },
              ]}
          />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
            <Controls.Input
              multiline
              minRows={5}
              maxRows={5}
              style={{ flexGrow: 1 }}
              aria-label="description"
              placeholder="Description"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
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

export default SolutionForm;