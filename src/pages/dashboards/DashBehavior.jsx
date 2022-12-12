import { Box, Sheet, Typography } from '@mui/joy'
import React, { Fragment } from 'react'
import SampleGraph  from '../../assets/images/radar_sample_graph.png'

export default function DashBehavior() {
  return (
      <Box
        sx={{
          mt: 2, 
          height: '80vh',
          width: '100%',
          bgcolor: 'background.componentBg',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overFlowY: 'auto',
        }}
      >

          <Typography level="h6">
            Dashboard: Behaviorial Analysis
          </Typography>

          <Typography level="body" 
            sx={{ 
              mt: 1,
              maxWidth: '500px',
            }}>
            Undeveloped:<br/> This component will graph the user's behavorial tendencies overall.
            The plan is to use AI/Neural-networks to do comparative analysis across all
            projects and then make suggestions on where to target personal growth solutions.
          </Typography>

          <img src={SampleGraph} width="400px" style={{marginTop: "25px"}}/>
          <p><em> Sample Radar graph image</em></p>


      </Box>
  )
}
