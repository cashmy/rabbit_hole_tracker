import React, { useEffect } from "react";
import { Select, Option } from '@mui/joy'
import { Grid, useTheme } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../hooks/useForm';

const initialFValues = {
  id: 0,
  project: '1',
  name: '',
  description: '',
  log_type: '',
  rating: 0,
  solution: null,
  completed: false,
  archived: false,
}

// * Main component
const PageForm = (props) => {
  const theme = useTheme();
  const { addOrEdit, recordForEdit } = props;
  const action = React.useRef(null);

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
    if ('log_type' in fieldValues)
        temp.log_type = fieldValues.log_type
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
  const handleSelectChange = (e, newValue) => {
    setValues(
      {
        ...values,
        log_type: newValue
      }
    )
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
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column"}}>
            <Controls.TextareaAuto
              minRows={3}
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

          <Grid item xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: 'flex-end',
              justifyContent: 'space-between'
            }}>

            <Grid item xs={3} >
              <Controls.Input
                name="rating"
                label="Rating"
                value={values.rating}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3} >
              <Controls.Select
                name="log_type"
                label="Log Type"
                value={values.log_type}
                onChange={handleSelectChange}
                error={errors.log_type}
                options={[
                  { id: 'i', title: 'Impediment' },
                  { id: 'd', title: 'Distraction' },
                  { id: 't', title: 'External Task' },
                  { id: 'u', title: 'Unclassified' },
                ]}
              />

            </Grid>
            <Grid item xs={2} >
              <Controls.Checkbox
                size="sm"
                name="solution"
                label="Solution"
                color="success"
                // value={values.solution}
                // onChange={handleToggleChange}
              />
            </Grid>
            <Grid item xs={2} >
              <Controls.Checkbox
                name="completed"
                label="Completed"
                value={values.completed}
                onChange={handleToggleChange}
              />
            </Grid>
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