import React from 'react'
import {
  Box,
  Sheet,
  Typography
} from '@mui/joy'

export default function SimpleTitleBar(props) {
  const { titleText, color, bgcolor } = props

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Sheet
        sx={{
          mt: 2, mb: 2, ml: 3, mr: 3,
          borderRadius: '10px',
          height: '30px',
          bgcolor: bgcolor || 'background.componentBg',
          color: color || 'white',
        }}>
        <Typography sx={{alignItems: 'center'}}>
          {titleText}
        </Typography>
      </Sheet>
    </Box>
  )
}

