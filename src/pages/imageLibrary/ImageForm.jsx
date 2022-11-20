// TODO: Replace defaulted user with login user
// TODO: Replace "tempServer" with a variable that can be set in the .env file

import React, { useEffect } from "react";
import { Grid, Typography } from '@mui/material';
import Controls from "../../components/controls/Controls";
import { Form, useForm } from '../../hooks/useForm';
import theme from '../../theme';
import {
  FormControl,
  FormLabel,
} from '@mui/material';
import { TextField } from '@mui/joy';
import Image from 'mui-image'

const tempServer = "http://localhost:8000";

const initialFValues = {
  id: 0,
  file_name: '',
  alt_text: '',
  mime_type: '',
  file_size: 0,
  user_id: 2,
}

// * Main component
const PageForm = (props) => {
  let val_image = ""
  const { addOrEdit, recordForEdit } = props;
  const [fileObject, setFileObject] = React.useState("http://localhost:8000/media/No_Image.png");
  const [addMode, setAddMode] = React.useState(true);

  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.alt_text = fieldValues.alt_text
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
    setValues({
      ...values,
      mime_type: event.target.files[0].type,
      file_size: event.target.files[0].size,
      file_name: event.target.files[0]
      // file_name: document.getElementById("val_image").value,
      // file_object: fileObject,
    });
  }

  // * Open disabled fields for editing
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && (event.key === "O" || event.key === "o")) {
        event.preventDefault();
        alert("Copy Selection ✂️");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => { /*removes event listener on cleanup*/
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [])

  // Add or Edit mode actions
  useEffect(() => {
    if (recordForEdit != null) {
      setFileObject(tempServer + recordForEdit.file_name)
      setAddMode(false)
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
        <Grid container spacing={2}>
          <Grid container spacing={2} item xs={6}>
            {!addMode &&
              <Grid item xs={12}>
                <Typography variant="body2"
                // sx={{ color: theme.palette.primary.text }}
                >
                  File name:
                </Typography>
                {values.file_name}
              </Grid>
            }
            <Grid item xs={12}>
              <Controls.Input
                name="alt_text"
                label="Title/Alt Text"
                color="info"
                value={values.alt_text}
                onChange={handleInputChange}
                error={errors.alt_text}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <FormLabel>
                  <Typography variant="body3">File Mime Type</Typography>
                </FormLabel>
                <TextField
                  variant="soft"
                  color="info"
                  name="mime_type"
                  size="sm"
                  value={values.mime_type}
                  onChange={handleInputChange}
                  error={errors.mime_type}
                // disabled
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <Typography variant="body3">File Size</Typography>
                </FormLabel>
                <TextField
                  variant="soft"
                  color="info"
                  name="file_size"
                  size="sm"
                  value={values.file_size}
                  onChange={handleInputChange}
                  error={errors.file_size}
                // disabled
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} item xs={6}>
            {/* //& File Input name */}
            {/* This field is intentionally uncontrolled */}
            <Grid item xs={12}>
              {addMode &&
                <input
                  id="val_image"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              }
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