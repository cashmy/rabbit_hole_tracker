import React from 'react'
import {
  Box,
  Sheet,
  Typography
} from '@mui/joy'
import Image from 'mui-image'
import RabbitsLooking from '../src/assets/images/rabbits_looking.jpg'

export default function PageNotFound() {
  return (
    <Box
      sx={{
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)',
        width: 'calc(100vw - 240px)'
      }} >

      <Box>
        <Sheet
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            height: '20vh',
            // bgcolor: 'blue',
          }}>
          <Box
            sx={{
              mb: 2,
              display: 'grid',
              gridTemplateColumns: '.5fr 1fr',
            }}
          >
            <Typography level='display1'>404</Typography>
            <Sheet
              sx={{
                ml:2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'center',
                // bgcolor: 'background.componentBg',
              }}>
              <Typography level='h2'>Page not found</Typography>
            </Sheet>
          </Box>
          
          <Typography level='body' >Sorry! We can't find what you are looking for.</Typography>
          <Typography level='body2' >(You may have fallen down another rabbit hole! 🐇 )</Typography>

        </Sheet>
      </Box>


      <Box>
        <Sheet
          sx={{
            mt: 3.5,
            borderRadius: '10px',
            height: '65vh',
            bgcolor: 'background.componentBg',
          }}>
          <Image
            src={RabbitsLooking}
            fit="cover"
            sx={{ borderRadius: '10px' }}
          />

        </Sheet>

      </Box>
    </Box>
  )
}