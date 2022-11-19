// TODO: Replace defaulted user with login user
// TODO: Replace "tempServer" with a variable that can be set in the .env file

import React, { useEffect } from "react";
import { Grid, Input } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../hooks/useForm';
import theme from '../../theme';
import Image from 'mui-image'
// import { AspectRatio } from "@mui/joy";

const tempServer = "http://localhost:8000";

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
  image: {
    file_name: "",
    alt_text: "",
    mime_type: "",
  },
}

// * Main component
const PageForm = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const [fileObject, setFileObject] = React.useState("http://localhost:8000/media/No_Image.png");

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
  const handleImageChange = (event) => {
    setFileObject(URL.createObjectURL(event.target.files[0]))
  }

  useEffect(() => {
    if (recordForEdit != null) {
      setFileObject(tempServer + recordForEdit.image.file_name)
      setValues({
        ...recordForEdit
      })
    }
    return function cleanup() {
      URL.revokeObjectURL(fileObject)
    }
  }, [recordForEdit])


  return (
    <React.Fragment>
      <Form>
        <Grid container spacing={2} >
          <Grid container spacing={2} item xs={6}>
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
          </Grid>

          <Grid container spacing={2} item xs={6}>
            {/* //& File Input name */}
            {/* This field is intentionally uncontrolled */}
            <Grid item xs={12}>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Image
                src={fileObject || ""}
                duration={3000}
                easing="cubic-bezier(0.7, 0, 0.6, 1)"
                shift="bottom"
                distance="100px"
                shiftDuration={1000}
                bgColor="inherit"
              />
            </Grid>
          </Grid>
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
      </Form>
    </React.Fragment>

  )
}

export default PageForm;