import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

// * Icons import
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BiotechIcon from '@mui/icons-material/Biotech';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';

export default function Navigation() {
  return (
    <List size="sm" sx={{ '--List-item-radius': '8px' }}>
      <ListItem nested sx={{ p: 0 }}>
        <Box
          sx={{
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            id="nav-list-browse"
            fontWeight={700}
            color="neutral" 
            sx={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
            }}
          >
            Browse
          </Typography>
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ '--IconButton-size': '24px' }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          {/* //& Dashboard */}
          <ListItem>
            <ListItemButton
              variant="soft"
              color="primary"
              component={RouterLink} to="/"
            >
              <ListItemDecorator sx={{ color: 'inherit' }}>
                <FolderOpenIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Dashboard</ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* //& Projects*/}
          <ListItem>
            <ListItemButton
              component={RouterLink} to="/projects"
            >
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <AccountTreeIcon />
              </ListItemDecorator>
              <ListItemContent>Projects</ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* //& Image Library*/}
          <ListItem>
            <ListItemButton
              component={RouterLink} to="/imageLibrary"
            >
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <ImageTwoToneIcon />
              </ListItemDecorator>
              <ListItemContent>Image Library</ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* //& Image Library*/}
          <ListItem>
            <ListItemButton
              component={RouterLink} to="/imageLibraryV1"
            >
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <ImageTwoToneIcon />
              </ListItemDecorator>
              <ListItemContent>Image Library (v1) </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* //& Test Component*/}
          <ListItem>
            <ListItemButton
              component={RouterLink} to="/testComponent"
            >
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <BiotechIcon />
              </ListItemDecorator>
              <ListItemContent>Test Component</ListItemContent>
            </ListItemButton>
          </ListItem>


          
        </List>
      </ListItem>

      {/* //& Tags: Nested List */}
      <ListItem nested>
        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            id="nav-list-tags"
            color="neutral" 
            fontWeight={700}
            sx={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
            }}
          >
            Tags
          </Typography>
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ '--IconButton-size': '24px' }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </Box>
        <List
          aria-labelledby="nav-list-tags"
          size="sm"
          sx={{
            '--List-decorator-size': '32px',
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    bgcolor: 'primary.300',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Personal</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    bgcolor: 'danger.400',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Work</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    bgcolor: 'warning.500',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Travels</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '99px',
                    bgcolor: 'success.400',
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Concert tickets</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
