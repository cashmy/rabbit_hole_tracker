import React, { Fragment } from 'react'
import { Box, Sheet, Typography } from '@mui/joy'
import SampleGraph  from '../../assets/images/bump_sample_graph.png'

export default function dashOverview() {
  return (
    <Fragment>
      <Box
        sx={{
          height: 'calc(100vh - 220px)',
          mt: 2,
        }}
      >
        <Sheet
          sx={{
            width: '100%',
            height: '80vh',
            maxHeight: '100vh',
            bgcolor: 'background.componentBg',
            // overflowY: 'auto',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography level="h6" sx={{ mt: 1 }}>
            Dashboard: All Projects Summation
          </Typography>

          <Typography level="body" 
            sx={{ 
              mt: 1,
              maxWidth: '500px',
            }}>
            Undeveloped:<br/> The idea is to show an over-arching view of all projects 
            for a visual comparative analysis of each of the categories of log types:
            Impediment, Distraction, Task (Internal or External), and Unclassified.
          </Typography>

          <img src={SampleGraph} width="800px" style={{marginTop: "25px"}}/>
          <p><em> Sample Bump Chart image</em></p>

        </Sheet>
      </Box>
    </Fragment>
  )
}
