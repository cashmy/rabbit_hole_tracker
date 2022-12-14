/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-11 22:22:03
 * @modify date 2022-11-11 22:22:03
 * @desc Project "Card" Table
 */

// #region [General Imports]
import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { format } from 'date-fns';

// * Joy UI
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardCover,
  ListItemDecorator,
  Menu,
  MenuItem,
  Typography
} from '@mui/joy'

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
import Controls from '../../components/controls/Controls';
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
  useFetchAllProjectsByArchiveStsQuery,
  useChangeProjectStatusMutation,
  useAddProjectMutation,
  useUpdateProjectMutation,
} from '../../features/projectSlice';
// #endregion


export default function ProjectCards() {
  // #region //* [Local State]
  const navigate = useNavigate();
  const [archiveStatus, setArchiveStatus] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false)
  const [currentItem, setCurrentItem] = useState();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const open = Boolean(anchorEl);

  const tempBaseDir = 'http://localhost:8000/';
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], isLoading } = useFetchAllProjectsByArchiveStsQuery(archiveStatus);
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
    }
    else {
      updateProject(record)
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
  }
  const handleArchive = () => {
    setArchiveStatus(!archiveStatus);
  }
  const handleArchiveItem = (id, status) => {
    let body = {
      id,
      archived: status,
    }
    changeProjectStatus(body)
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
        "Are you sure you want to delete this Project?",
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
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const handleEdit = (record) => {
    const newRecord = { ...record };
    // work around for lack of "returned" FK fields from API
    newRecord.file = record.image.file_name
    newRecord.image_id = record.image.id
    newRecord.user_id = record.user.id

    setRecordForEdit(newRecord) ;
    setOpenPopup(true)
  };
  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  const handleDetails = (item) => {
    navigate("/rabbitHole", { state: {projectId: item.id, projectName: item.name, projectImage: item.image.file_name }});
  }
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
        avatarIcon="icon"
        // avatarImage="http://localhost:8000/media/gary-bendig-KvHT4dltPEQ-unsplash.jpg"
        avatarImage={<AccountTreeIcon />}
        addFab={true}
        returnFab={true}
        archiveFab={true}
        archiveStatus={archiveStatus}
        handleArchive={handleArchive}
        searchBar={true}
        handleAdd={handleAdd}
      />

      {/* //* Page: Card Table Body */}
      {isLoading ? (
        <Typography>isLoading...</Typography>
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
                  alt={item.image != "" && item.image != null ? item.image.alt_text : item.name}
                  src={item.image != ""
                    ? tempBaseDir + item.image.file_name
                    : NoImage}
                />
              </CardCover>
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
                <Controls.ActionButton
                  tooltipText="More options"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  aria-label={`more options for ${item.name}`}
                  onClick={(e) => {
                    handleMenuClick(e, item);
                  }}
                >
                  <MoreVertIcon sx={{ color: 'darkmagenta' }} />
                </Controls.ActionButton>

                {/* //& Edit */}
                <Controls.ActionButton
                  tooltipText="Edit"
                  aria-label={`edit ${item.name}`}
                  onClick={() => handleEdit(item)}
                >
                  <EditOutlinedIcon sx={{ color: 'green' }} />
                </Controls.ActionButton>


                {/* //& Assign Details */}
                <Controls.ActionButton
                  tooltipText="Assign Details"
                  aria-label={`Work with ${item.name}`}
                  onClick={() => handleDetails(item)}                  
                >
                  <AssignmentIcon sx={{ color: 'darkorange' }} />
                </Controls.ActionButton>

              </Box>
            </CardContent>
          </Card>
        ))
      )}

      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={"Project Details"} titleColor={"darkblue"} pageWidth={'md'} >
        <PageForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </PageDialog>
      <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

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
