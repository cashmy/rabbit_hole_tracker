/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-19 22:22:03
 * @modify date 2022-11-19 22:22:03
 * @desc 
 * @desc 
 */

// #region [General Imports]
import React, { useState, Fragment, useEffect } from 'react';
import ProjectDtlGraph from './ProjectDtlGraph';
import { getData } from './singleProjectData'  // ! Rmv when refactoring

// * Joy UI
import {
  AspectRatio,
  Box,
  Card,
  CardCover,
  Sheet,
  Switch,
  Tooltip,
  Typography
} from '@mui/joy'
import Controls from '../../components/controls/Controls';
const noImage = "http://localhost:8000/media/No_Image.png";
const tempBaseDir = 'http://localhost:8000/';
// #endregion

// #region [RTK Customizable Services]
import ProjectListSimple from '../projectCards/ProjectListSimple'
// #endregion

// ^ MAIN COMPONENT
export default function DashProjDetail() {
  // #region //* [Local State]
  const [layout, setLayout] = useState('vertical')          // vertical, horizontal
  const [groupMode, setGroupMode] = useState('grouped')     // grouped, stacked
  const [valueScale, setValueScale] = useState('linear')    // linear, symlog
  const [reverse, setReverse] = useState(false)             // true, false
  const [avatarImage, setAvatarImage] = useState(noImage)
  const [projectSelected, setProjectSelected] = useState(false)

  const [data, setData] = useState(getData())
  // ? Temp const variables
  const [projectName, setProjectName] = useState('Select a Project for ...')
  // #endregion

  // #region //* [Event Handlers]
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
  const handleSelectedProject = (project) => {
    setProjectName(project.name)
    // TODO Get "real" data for project
    setData(getData())
    setAvatarImage(tempBaseDir + project.image.file_name)
    { !projectSelected ? setProjectSelected(true) : "" }
  }
  // #endregion

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
          {!projectSelected && <Sheet
            sx={{
              width: '100%',
              height: '82vh',
              bgcolor: 'background.componentBg',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
            }}
          >
            {/* //& Image & Title Bar */}
            <Box
              sx={{
                mt: 6.5,
                display: 'flex',
                flexDirection: "row",
                gridTemplateColumns: '1fr, 3fr',
              }}
            >
              {/* //* Image */}
              <Box sx={{
                ml: 3,
                width: "85px"
              }}>
                <AspectRatio ratio={1}>
                  <Card >
                    <CardCover>
                      <img
                        src={noImage}
                      />
                    </CardCover>
                  </Card>
                </AspectRatio>
              </Box>

              {/* //* Title & Subtitle */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: 'center',
                  width: '78%',
                }}
              >
                <Typography level='h3' >Select a project for ...</Typography>
                <Typography level='h6'>Rabbit Hole Analysis</Typography>
              </Box>
            </Box>
          </Sheet>}
          {projectSelected && <ProjectDtlGraph
            project_name={projectName}
            avatarImage={avatarImage}
            data={data}
            layout={layout}
            groupMode={groupMode}
            valueScale={valueScale}
            reverse={reverse}
          />}
        </Box>

        {/* //* Right Hand Column - Table of Projects */}
        <Box>
          <Box
            sx={{
              m: 2,
              ml: 3,
              height: '47vh',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'row',
              bgcolor: 'background.componentBg',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ProjectListSimple handleSelectedProject={handleSelectedProject} />
          </Box>
          <Box
            sx={{
              m: 2,
              mt: 3,
              ml: 3,
              height: '32.5vh',
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
              <Typography level="h6" sx={{ mt: 2 }}>
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

                <Typography level="body" component="label" sx={{ mt: 1 }}
                  endDecorator={
                    <Switch
                      checked={reverse}
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
