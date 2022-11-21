/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-21 22:22:03
 * @modify date 2022-11-21 22:22:03
 * @desc Control Component for Project Details (Rabbit Holes)
 * @desc This component will control the switching between the different views
 * @desc of the project details page. It will also control the data flow between
 * @desc the different views.
 */

// #region [General Imports]
import React, { useState, useEffect } from "react";

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
import { maxWidth } from '@mui/system';

// * Mui Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import PrintIcon from '@mui/icons-material/Print';

// * Components
import Controls from '../../components/controls/Controls';
import TitleBar from '../../components/titleBar';
import NoImage from '../../assets/images/no_image.png';
import Notification from '../../components/controls/Notification';
// #endregion

// #region [Customizable imports]
// import PageForm from "./RabbitHoleForm";
import PageDialog from '../page_dialog';
// #endregion

// *** RTK/Service Layer(s) ***
// #region [RTK Customizable Services]
import {
  useDeleteProjectMutation,
  useFetchAllProjectsByArchiveStsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
} from '../../features/projectSlice';
// #endregion

export default function RabbitHoleControl() {
  // #region //* [Local State]
  const [displayGrid, setDisplayGrid] = React.useState(false);
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [currentItem, setCurrentItem] = useState();
  // const open = Boolean(anchorEl);
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], loading } = useFetchAllProjectsByArchiveStsQuery(archiveStatus);
  const [deleteRabbitHole] = useDeleteProjectMutation();
  const [addRabbitHole] = useAddProjectMutation();
  const [updateRabbitHole] = useUpdateProjectMutation();
  // #endregion

  // #region //* [Event Handlers]
  const addOrEdit = (record, resetForm) => {
    let close = false
    if (record.id === 0) {
      addRabbitHole(record)
      resetForm()
    }
    else {
      updateRabbitHole(record)
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
    deleteRabbitHole(id)
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const handleEdit = (record) => {
    console.log("Record: ", record);
    const newRecord = { ...record };
    newRecord.file = record.image.file_name

    setRecordForEdit(newRecord);
    setOpenPopup(true)
  };
  const handleDisplay = () => {
    setDisplayToggle(!displayToggle);
  }
  // #endregion

  return (
    <Box
      sx={{
        display: 'grid',

      }}
    >
      {/* //* Page: Project Details (Rabbit Holes) Header */}
      <TitleBar
        componentTitle="Project Details (Rabbit Holes)"
        avatarIcon="icon"
        avatarImage={<VerticalAlignBottomIcon />}
        addFab={true}
        returnFab={true}
        toggleFab={true}
        // searchBar={true}
        handleAdd={handleAdd}
        handleDisplay={handleDisplay}
      />

      {/* //* Handle Display here */}
      <Typography level="body" sx={{ textAlign: 'center' }}>
        {displayGrid
          ? "Grid"
          // ? <RabbitHoleGrid handleEdit={handleEdit} handleDelete={handleDelete} />
          : "Table"
          // : <RabbitHoleTable handleEdit={handleEdit} handleDelete={handleDelete} />
        }
      </Typography>



      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={"RabbitHole"} titleColor={"darkblue"} pageWidth={'md'} >
        <PageForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </PageDialog>
      <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

    </Box>

  )

}