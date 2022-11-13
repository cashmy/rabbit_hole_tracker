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
import Notification from '../../components/controls/Notification';
// #endregion

// #region [Customizable imports]
import PageForm from "./ProjectCardForm";
import PageDialog from '../page_dialog';
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
import ActionButton from '../../components/controls/ActionButton';

// #endregion


export default function ProjectCards() {
  // #region // [Global State]
  // const dispatch = useDispatch();
  // dispatch(updateComponentTitle("Projects"));
  // const componentTitle = useSelector((state) => state.appHeader.componentTitle);
  // #endregion

  // #region //* [Local State]
  const [archiveStatus, setArchiveStatus] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false)
  const [currentItem, setCurrentItem] = useState();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const open = Boolean(anchorEl);

  const tempBaseDir = 'http://localhost:8000';
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], loading } = useFetchAllProjectsAdminQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const [changeProjectStatus] = useChangeProjectStatusMutation();
  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  // #endregion

  // #region //* [Event Handlers]
  const addOrEdit = (record, resetForm) => {
    let close = false
    if (record.id === 0) {
      addProject(record)
      resetForm()
      // setLoadData(true); // Request reload of data
    }
    else {
      updateProject(record)
      // setLoadData(true); // Request reload of data
      close = true
    }
    if (close) {
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false) // Close Popup modal
    }

    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    })
  };
  const handleAdd = () => {
    setOpenPopup(true);
    setRecordForEdit(null);
    // alert("Adding a new item... \nReady for implementation");
  }
  const handleArchive = () => {
    setArchiveStatus(!archiveStatus);
    alert("Switching Archive Status... \n");
  }
  const handleArchiveItem = (id, status) => {
    let body = {
      id,
      archived: status,
    }
    console.log("Body: ", body);
    changeProjectStatus(body)
    // setLoadData(!loadData); // Request reload of data
    setNotify({
      isOpen: true,
      message: status ? "Record Archived" : "Record Re-Activated",
      type: "error",
    });
  }
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
  const handleEdit = (record) => {
    setRecordForEdit(record);
    setOpenPopup(true)
  };
  const handleMenuClick = (event, item) => {
    console.log("Menu click item: ", item);
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
        componentTitle="Projects"
        addFab={true}
        returnFab={true}
        archiveFab={true}
        archiveStatus={archiveStatus}
        handleArchive={handleArchive}
        searchBar={true}
        handleAdd={handleAdd}
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
                <ActionButton
                  tooltipText="More Options 2"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  aria-label={`more options for ${item.name}`}
                  onClick={(e) => {
                    handleMenuClick(e, item);
                  }}
                >
                  <MoreVertIcon sx={{ color: 'darkmagenta' }} />
                </ActionButton>

                {/* //& Edit */}
                <ActionButton
                  tooltipText="Edit"
                  aria-label={`edit ${item.name}`}
                  onClick={() => handleEdit(item)}
                >
                  <EditOutlinedIcon sx={{ color: 'green' }} />
                </ActionButton>


                {/* //& Assign Details */}
                <ActionButton
                  tooltipText="Assign Details (disabled)"
                  aria-label={`Work with ${item.name}`}
                  // onClick={() => {
                  //   handleArchiveItem(item);
                  // }}
                >
                  <AssignmentIcon sx={{ color: 'darkorange' }} />
                </ActionButton>

              </Box>
            </CardContent>
          </Card>
        ))
      )}

      {/* //* Dialogs, Modals, & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={"Project Details"} titleColor={"darkblue"} >
        <PageForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </PageDialog>
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
          onClick={() => handleArchiveItem(currentItem.id, !currentItem.archived)}
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
          disabled
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
