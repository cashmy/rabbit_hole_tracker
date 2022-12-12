/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-12-08 22:22:03
 * @modify date 2022-12-08 22:22:03
 * @desc   Dashboard Control component
 * @desc   A tabbed control systems that handles switching between 
 * @desc   different views of high level analysis
 * @desc     >> View 1: Overview/Summation of all projects for the user.
 * @desc     >> View 2: Behaviorial Analysis of RH tendencies.
 * @desc     >> View 3: Project Selection & mid-level detail analysis
 */

// #region [General Imports]
import React, { useState } from 'react';

// * Joy UI
import {
  Box,
  Sheet,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from '@mui/joy'
import colors from '@mui/joy/colors';
// #endregion

// #region [Customizable imports]
import DashProjDetail from './DashProjDetail';
import DashBehavior from './DashBehavior';
import DashOverview from './DashOverview';
// #endregion

// ^ MAIN COMPONENT
export default function DashboardControl() {
  // #region //* [Local State]
  const [index, setIndex] = useState(0)
  // #endregion

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 2,
        width: 'calc(100vw - 240px)',
        height: 'calc(100vh - 100px)',
      }}
    >
      <Tabs
        size='sm'
        defaultValue={0}
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={{
          borderRadius: '10px',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'center',
          bgcolor: 'transparent',

        }}
      >
        <TabList variant="soft" sx={{ p: 1, }} >
          <Tab
            variant={index === 0 ? 'solid' : 'plain'}
            color={index === 0 ? 'primary' : 'neutral'}
          >Overview</Tab>
          <Tab
            variant={index === 1 ? 'solid' : 'plain'}
            color={index === 1 ? 'primary' : 'neutral'}
          >Project Details</Tab>
          <Tab
            variant={index === 2 ? 'solid' : 'plain'}
            color={index === 2 ? 'primary' : 'neutral'}
          >Behaviorial Analysis</Tab>
        </TabList>


        <Sheet
          elevation={10}
          sx={{
            mt: 1,
            bgcolor: 'transparent',
            overflowY: 'auto',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'top',
          }}
        >
          {/* //* Component Panels */}
          <TabPanel value={0}> <DashOverview /> </TabPanel>
          <TabPanel value={1}> <DashProjDetail /> </TabPanel>
          <TabPanel value={2}> <DashBehavior /> </TabPanel>
        </Sheet>
      </Tabs>
    </Box>
  )
}