

// #region [General Imports]
import React, { useState } from 'react'
// * Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentTitle } from '../features/appHeader/appHeaderSlice';

// * React Router
import { Routes, Route } from 'react-router-dom';

// * JOY UI
import { GlobalStyles } from '@mui/system';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider, styled } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { Menu, MenuItem, Tooltip } from '@mui/joy';

// * Icons import
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';

// * custom
import filesTheme from '../theme';
import ColorSchemeToggle from '../components/ColorSchemeToggle';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';

import BackgroundImage from "../assets/images/hole-std-bckgrd-dark.jpg";
import BackgroundImageLight from "../assets/images/hole-std-bckgrd-light.jpg";

// * Helper functions
import { stringAvatar } from '../helpers/avatarFn';
import theme from '../theme';
// #endregion

// #region [Customizable imports]
import ProjectCards from '../pages/projectCards/ProjectCardTable';
import TestComponent from '../pages/testComponent/TestComponent';
import ImageLibraryTable from '../pages/imageLibrary/ImageLibraryTable';
import ImageLibraryTableV1 from '../pages/imageLibrary/ImageLibraryTableV1';
import SignInSide from '../pages/signIn/SignInSide';
import RegistrationSide from '../pages/signIn/RegistrationSide';
import RabbitHoleControl from '../pages/rabbitHoles/RabbitHoleControl';
// #endregion


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// #region [Styled Components]
const BackgroundPaper = styled('div')(({ theme }) => ({
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  marginTop: '0px',
  height: 'calc(100vh - 0px)',
  backgroundImage: theme.palette.mode === "dark"
    ? `url(${BackgroundImage})`
    : `url(${BackgroundImageLight})`,
}));
// #endregion

function App() {
  // #region //* [Local State]
  const dispatch = useDispatch();
  dispatch(updateComponentTitle("Dashboard"));
  //  const componentTitle = useSelector((state) => state.appHeader.componentTitle);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [sidePaneDisplay, setSidePaneDisplay] = useState(false);
  // #endregion

  // #region //* [Event Handlers]
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // #endregion

  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      <BackgroundPaper>
        <Layout.Root
          theme={theme}
          sx={{
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
              md: `minmax(160px, 250px) minmax(600px, 1fr) ${sidePaneDisplay && 'minmax(250px, 300px)'}`,
            },
            ...(drawerOpen && {
              height: '100vh',
              overflow: 'hidden',
            }),
          }}
        >

          <Layout.Header>
            {/* //* Left Hand side of Header */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              {/* Hamburger Button for Mobile display */}
              <IconButton
                variant="outlined"
                size="sm"
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              {/* App Icon button - non active */}
              <IconButton
                size="sm"
                variant="solid"
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                <FindInPageRoundedIcon />
              </IconButton>
              <Typography component="h1" fontWeight="xl">
                Rabbit Hole Tracker
              </Typography>
            </Box>

            {/* //* Center Component Title */}
            <Typography fontWeight="lg" fontSize="md" textColor="text.tertiary">
              {/* {componentTitle} */}
            </Typography>

            {/* // * Right Hand side of Header */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
              {/* Theme */}
              <ColorSchemeToggle />

              {/* // * Avatar */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="./src/assets/images/avatar-lg.jpg"
                      size="md"
                      {...stringAvatar('Remy Sharp')}
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  // anchorOrigin={{
                  //   vertical: 'top',
                  //   horizontal: 'right',
                  // }}
                  keepMounted
                  // transformOrigin={{
                  //   vertical: 'top',
                  //   horizontal: 'right',
                  // }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>

              </Box>
            </Box>
          </Layout.Header>

          {/* //* Left Side Navigation */}
          <Layout.SideNav>
            <Navigation />
          </Layout.SideNav>

          {/* //* Main Display with Routing */}
          <Layout.Main>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 2,
              }}
            >

              <Routes>
                {/* <Route path="/" element={<Dashboard />} /> */}
                <Route path="/projects" element={<ProjectCards />} />
                <Route path="/imageLibrary" element={<ImageLibraryTable />} />
                <Route path="/imageLibraryV1" element={<ImageLibraryTableV1 />} />
                <Route path="/testComponent" element={<TestComponent />} />
                <Route path="/registration" element={<RegistrationSide />} />
                <Route path="/login" element={<SignInSide />} />
                <Route path="/rabbitHole" element={<RabbitHoleControl />} />
                {/* <Route path="*" element={<Navigate to="/projects" />} /> */}
              </Routes>


            </Box>
          </Layout.Main>

          {/* //* Right Side form */}
          {sidePaneDisplay &&
            <Sheet
              sx={{
                display: { xs: 'none', sm: 'initial' },
                borderLeft: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                bgcolor: 'background.componentBg',
              }}
            >
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flex: 1 }}>Optional Side Pane</Typography>
                <IconButton variant="outlined" color="neutral" size="sm">
                  <CloseIcon />
                </IconButton>
              </Box>
            </Sheet>
          }
        </Layout.Root>
      </BackgroundPaper>
    </CssVarsProvider>
  )
}

export default App
