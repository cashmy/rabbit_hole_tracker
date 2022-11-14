import React, { useEffect } from "react";
import { Grid, TextField } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../hooks/useForm';
import theme from '../../theme';

const initialFValues = {
  id: 0,
  name: '',
  abbreviation: '',
  description: '',
  text_color: '#000000',
  theme_color: '#00a2ed',
  user_id: 2,
  image_id: '1',
  archived: false,
  image: '',
}

// * Main component
const PageForm = (props) => {
  const { addOrEdit, recordForEdit } = props;

  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name
        ? ""
        : "This field is required."
    if ('description' in fieldValues)
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
              color="primary"
              onChange={handleInputChange}
              error={errors.name}
              placeholder="Enter a name for the project"
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.TextareaAuto
              name="description"
              label="Description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
              placeholder="Enter a description for the project"
              minRows={2}
              maxRows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Input
              type="file"
              variant="soft"
              name="image"
              label="Image"
              size="sm"
              value={values.image}
              onChange={handleInputChange}
              error={errors.image}
              placeholder="Enter a description for the project"
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", marginTop: theme.spacing(2) }} >
            <Controls.Button
              color="primary"
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