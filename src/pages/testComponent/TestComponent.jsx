import { useState, useEffect } from 'react';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../hooks/useForm';
import { Grid } from '@mui/material';
import Image from 'mui-image'
import { Input } from "@mui/material";
import TitleBar from '../../components/titleBar';

// * Joy UI
import {
  Box,
  // Input,
  Sheet,

} from '@mui/joy'
import React from 'react'



export default function TestComponent() {
  const [fileObject, setFileObject] = useState("");

  const handleImageChange = (event) => {
    setFileObject(URL.createObjectURL(event.target.files[0]))
  }


  useEffect(() => {
    // Clean up
    return function cleanup() {
      URL.revokeObjectURL(fileObject)
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 2,
      }}
    >
      {/* //* Page: Test Component Header */}
      <TitleBar componentTitle="Test Component" />
      <Sheet>

        {/* //& File Input name */}
        {/* <input type="file" onChange={handleImageChange} /> */}
        <Input
          type="file"
          // variant="filled"
          name="file"
          label="Image"
          size="sm"
          value={fileObject}
          onChange={handleImageChange}
        />

        {/* //& File Input name */}
        <Image
          src={fileObject || ""}
          // src={"http://localhost:8000/media/1621719474446.jpg" || ""}
          // src={"http://localhost:8000/media/No_Image.png"}
          // fit="contain"
          duration={3000}
          easing="cubic-bezier(0.7, 0, 0.6, 1)"
          shift="left"
          distance="100px"
          shiftDuration={1000}
          bgColor="inherit"
        />

      </Sheet>

    </Box>
  )
}
