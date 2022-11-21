// TODO: Replace defaulted user with login user
// TODO: Replace "tempServer" with a variable that can be set in the .env file

// #region [General Imports]
import React, { useState, useEffect } from "react";
import { useForm, Form } from '../../hooks/useForm';
import { Grid } from '@mui/material';
import { Typography } from '@mui/joy';
import Controls from "../../components/controls/Controls";
import theme from '../../theme';
import Image from 'mui-image'
// #endregion

// #region [Customizable imports]
import PageDialog from '../page_dialog';
import ImageLibraryTable from '../imageLibrary/ImageLibraryTable';
// #endregion

const tempServer = "http://localhost:8000";
const noImage = "http://localhost:8000/media/No_Image.png";

const initialFValues = {
  id: 0,
  name: '',
  abbreviation: '',
  description: '',
  text_color: '#000000',
  theme_color: '#00a2ed',
  user_id: 2,
  image_id: 1,
  archived: false,
  image: {
    file_name: "",
    alt_text: "",
    mime_type: "",
    file_size: 0,
  },
}

// * Main component
const PageForm = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const [fileObject, setFileObject] = React.useState(noImage);
  const [openPopup, setOpenPopup] = useState(false)

  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name
        ? ""
        : "This field is required."
    if ('abbreviation' in fieldValues)
        temp.abbreviation = fieldValues.abbreviation
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

  // #region //* [Event Handlers]
  // SaveSubmit Callback handler - event driven
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Values: ", values);
    if (validate())
      addOrEdit(values, resetForm);
      setFileObject(noImage);
  };
  const handleReset = () => {
    if (recordForEdit == null)
      resetForm()
    else setValues({ ...recordForEdit })
  }
  const selectImage = (imageRecord) => {
    setOpenPopup(false)
    setFileObject(tempServer + imageRecord.file_name);
    // setValues({})
    setValues({
      ...values,
      image_id: imageRecord.id,
      user_id: 2,
      image: {
        id: imageRecord.id,
        file_name: imageRecord.file_name,
        alt_text: imageRecord.alt_text,
        mime_type: imageRecord.mime_type,
        file_size: imageRecord.file_size,
      }
    });
  }
  // #endregion


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
          {/* //& Fields */}
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
              <Controls.Input
                name="abbreviation"
                label="Abbreviation"
                value={values.abbreviation}
                color="primary"
                onChange={handleInputChange}
                error={errors.abbreviation}
                placeholder="Enter an 3+ character abbreviation project"
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

            {/* //& Image Selection & Display */}
          <Grid container spacing={2} item xs={6} sx={{display: 'flex', justifyContent: 'center'}} >
            {/* This field is intentionally uncontrolled */}
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
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}} >
              <Controls.Button
                onClick={() => setOpenPopup(true)}
                text={fileObject == noImage ? "Select Image" : "Change Image"}
                color={fileObject == noImage ? 'primary' : 'secondary'}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", marginTop: theme.spacing(2), alignItems: 'center' }} >
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

      {/* Nested Modal ?? */}
      <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={"Image Selections"} titleColor={"green"} pageWidth={'xl'} >
        <ImageLibraryTable selectImage={selectImage} />
      </PageDialog>
    </React.Fragment>

  )
}

export default PageForm;