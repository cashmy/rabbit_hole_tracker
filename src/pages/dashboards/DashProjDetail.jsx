/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-19 22:22:03
 * @modify date 2022-11-19 22:22:03
 * @desc Admin for Image Library maintanence.
 * @desc //* New Version 2!!!
 */

// #region [General Imports]
import React, { useState, Fragment } from 'react';
import ProjectDtlGraph from './ProjectDtlGraph';
import data from './singleProjectData'  // ! Rmv when refactoring

// * Joy UI
import {
  Box,
  Sheet,
  Switch,
  Tooltip,
  Typography
} from '@mui/joy'
import Controls from '../../components/controls/Controls';
// #endregion

// #region [RTK Customizable Services]
// #endregion

// ^ MAIN COMPONENT
export default function DashProjDetail() {

  const [layout, setLayout] = useState('vertical')          // vertical, horizontal
  const [groupMode, setGroupMode] = useState('grouped')     // grouped, stacked
  const [valueScale, setValueScale] = useState('linear')    // linear, symlog
  const [reverse, setReverse] = useState(false)             // true, false

  // ? Temp const variables
  const project_name = 'Game of Thrones Project'

  const handleLayoutChange = (e, newValue) => {
    setLayout(newValue)
  }
  const handleGroupModeChange = (e, newValue) => {
    setGroupMode(newValue)
  }
  const handleValueScaleChange = (e, newValue) => {
    setValueScale(newValue)
  }
  const handleToggleChange = (event) => {
    const value = event.target.checked;
    setReverse(value);
  };
  const handleReset = () => {
    setLayout('vertical')
    setGroupMode('grouped')
    setValueScale('linear')
    setReverse(false)
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '6fr 3fr',
        }}>

        {/* //* Display Pane of Graph */}
        <Box
          sx={{
            height: 'calc(100vh - 220px)',
            mt: 2,
          }}
        >
          <Sheet
            sx={{
              width: '100%',
              height: '77vh',
              maxHeight: '100vh',
              bgcolor: 'background.componentBg',
              // overflowY: 'auto',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ProjectDtlGraph
              project_name={project_name}
              data={data}
              layout={layout}
              groupMode={groupMode}
              valueScale={valueScale}
              reverse={reverse}
            />
          </Sheet>
        </Box>

        {/* //* Right Hand Column - Table of Projects */}
        <Box>
          <Box
            sx={{
              m: 2,
              ml: 3,
              height: 'calc(45vh)',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'row',
              bgcolor: 'background.componentBg',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            (Project List goes here ... )
          </Box>
          <Box
            sx={{
              m: 2,
              mt: 3,
              ml: 3,
              height: 'calc(30vh)',
              bgcolor: 'background.componentBg',
              borderRadius: '15px',
              // display: 'flex',
              // flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
              }}
            >
              <Typography level="h6" sx={{ mt: 1 }}>
                Graphing options
              </Typography>
            </Box>
            <Box
              sx={{
                ml: 2,
                mr: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Controls.Select
                name="layout"
                label="Layout"
                defaultValue={"vertical"}
                onChange={handleLayoutChange}
                value={layout}
                options={[
                  { id: 'vertical', title: 'Vertical' },
                  { id: 'horizontal', title: 'Horizontal' },
                ]}
              />
              <Controls.Select
                name="groupMode"
                label="Mode"
                defaultValue={"grouped"}
                onChange={handleGroupModeChange}
                value={groupMode}
                options={[
                  { id: 'grouped', title: 'Grouped' },
                  { id: 'stacked', title: 'Stacked' },
                ]}
              />
              <Controls.Select
                name="valueScale"
                label="Scale"
                defaultValue={"linear"}
                onChange={handleValueScaleChange}
                value={valueScale}
                options={[
                  { id: 'linear', title: 'Linear' },
                  { id: 'symlog', title: 'SymLog' },
                ]}
              />
              <Box 
              sx={{
                mt: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              >

              <Typography level="body" component="label" sx={{mt:1}}
                endDecorator={
                  <Switch
                    size="sm"
                    sx={{ ml: 1 }}
                    onChange={handleToggleChange}
                  />
                }
                size='sm'
              >Reverse </Typography>
              <Controls.Button 
                text="Reset"
                color="primary"
                onClick={handleReset}
              />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}
