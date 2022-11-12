/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-11 22:22:03
 * @modify date 2022-11-11 22:22:03
 * @desc Template for a table like page.
 * TODO - Add Detail form/modal in imports & Controls.popup
 */

// #region [General Imports]
import { useState } from 'react';
import { format } from 'date-fns';
// * Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentTitle } from '../../features/appHeader/appHeaderSlice';
// * Joy UI
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardCover,
  CardOverflow,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/joy'
import React from 'react'

// * Mui Icons
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PrintIcon from '@mui/icons-material/Print';

// * Components
import TitleBar from '../../components/titleBar';
import NoImage from '../../assets/images/no_image.png';
// #endregion

// *** RTK/Service Layer(s) ***
// #region [RTK Customizable Services]
import {
  useDeleteProjectMutation,
  useFetchAllProjectsAdminQuery,
  useFetchAllProjectsByArchiveSts,
  useChangeProjectStatusMutation,
  useAddProjectMutation,
  useUpdateProjectMutation,
} from '../../features/projectSlice';
import { maxWidth } from '@mui/system';

// #endregion


export default function ProjectCards() {
  // #region [Global State]
  // const dispatch = useDispatch();
  // dispatch(updateComponentTitle("Projects"));
  // const componentTitle = useSelector((state) => state.appHeader.componentTitle);
  // #endregion
  const [archiveStatus, setArchiveStatus] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState();
  const open = Boolean(anchorEl);

  const tempBaseDir = 'http://localhost:8000';
  // * #region [RTK Data requests]
  const { data = [], loading } = useFetchAllProjectsAdminQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const [changeProjectStatus] = useChangeProjectStatusMutation();
  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  // #endregion

  // * #region [Event Handlers]
  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title:
        "Are you sure you want to delete this Curriculum Theme and all of its Detail?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    })
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteProject(id)
    setLoadData(!loadData); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const handleArchive = () => {
    setArchiveStatus(!archiveStatus);
  }
  const handleArchiveItem = (id) => {

   }
  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  // #endregion

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 2,
      }}
    >
      {/* //* Page: Card Table Header */}
      <TitleBar
        componentTitle="Project Cards"
        addFab={true}
        returnFab={true}
        archiveFab={true}
        archiveStatus={archiveStatus}
        handleArchive={handleArchive}
        searchBar={true}
      />

      {/* //* Page: Card Table Body */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        data.map((item, index) => (
          <Card
            key={index}
            sx={{
              '--Card-radius': (theme) => theme.vars.radius.sm,
              boxShadow: 'none',
              minHeight: '240px',
            }}
          >
            {/* //& Card Image */}
            <AspectRatio ratio="16/9" color="primary">
              <CardCover>
                <img
                  alt={item.image != "" ? item.image.alt_text : item.name}
                  // src={NoImage}
                  // TODO: Add relative path to image in DB
                  src={item.image != ""
                    ? tempBaseDir + item.image.file_name
                    : NoImage}
                // src="http://localhost:8000/media/images/1621719474446.jpg"
                // src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
                />
              </CardCover>
              {/* <CardCover
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
                }}
              /> */}
            </AspectRatio>
            {/* //& Card Data & Actions*/}
            <CardContent
              sx={{
                mt: 'auto',
                flexGrow: 0,
                flexDirection: 'row',
                alignItems: 'end',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  pt: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography>{item.name}</Typography>
                  <Typography level="body3" mt={0.5}>
                    Added {format(new Date(item.created_at), 'MMM dd, yyyy')}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{
                pt: 1,
                size: "sm",
                display: 'flex',
                alignItems: 'right'
              }}>
                {/* //& MoreVertical */}
                <Tooltip title="More Options">
                  <IconButton
                    id="basic-menu-button"
                    variant="plain"
                    color="neutral"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    aria-label={`more options for ${item.name}`}
                    onClick={(e) => {
                      handleMenuClick(e, item);
                    }}
                    size="sm">
                    <MoreVertIcon sx={{ color: 'darkmagenta' }} />
                  </IconButton>
                </Tooltip>

                {/* //& Edit */}
                <Tooltip title="Edit">
                  <IconButton
                    variant="plain"
                    color="neutral"
                    aria-label={`edit ${item.name}`}
                    // onClick={() => {
                    //   handleEdit(props.item);
                    // }}
                    size="sm"
                  >
                    <EditOutlinedIcon sx={{ color: 'green' }} />
                  </IconButton>
                </Tooltip>

                {/* //& Assign Details */}
                <Tooltip title="Assign Items">
                  <IconButton
                    variant="plain"
                    color="neutral"
                    aria-label={`Work with ${item.name}`}
                    // onClick={() => {
                    //   handleArchiveItem(item);
                    // }}
                    size="sm">
                    <AssignmentIcon sx={{ color: 'darkorange' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        aria-labelledby="basic-menu-button"
        placement="bottom-end"
      >
        {/* //& Archive Item */}
        <MenuItem
          onClick={() => handleArchiveItem(currentItem.id, currentItem.archived)}
          variant="plain"
          color="neutral"
          aria-label={!archiveStatus ? "archive project" : "re-active project"}
          size="sm"
        >
          <ListItemDecorator>
            {!archiveStatus && <ArchiveIcon style={{ color: "darkorchid" }} />}
            {archiveStatus && <UnarchiveIcon style={{ color: "darkorchid" }} />}
          </ListItemDecorator>
          <Typography level="body2">
            {!archiveStatus && 'Archive'}
            {archiveStatus && 'Re-activate'}
          </Typography>
        </MenuItem>

        {/* //& Delete Item */}
        <MenuItem
          onClick={() => handleDelete(currentItem.id)}
          variant="plain"
          color="neutral"
          aria-label="delete project"
          size="sm"
        >
          <ListItemDecorator>
            <DeleteIcon style={{ color: "red" }} />
          </ListItemDecorator>
          <Typography level="body2">
            Delete
          </Typography>
        </MenuItem>

        {/* //& Print Item */}
        <MenuItem
          onClick={() => handlePrint(currentItem.id)}
          variant="plain"
          color="neutral"
          aria-label='print project'
          size="sm"
        >
          <ListItemDecorator>
            <PrintIcon sx={{ color: 'darkcyan' }} />
          </ListItemDecorator>
          <Typography level="body2">
            Print
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
