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
import { useLocation } from "react-router-dom";

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
  Sheet,
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
import Notification from '../../components/controls/Notification';
// #endregion

// #region [Customizable imports]
import PageForm from "./RabbitHoleForm";
import PageDialog from '../page_dialog';
import RabbitHoleTable from "./RabbitHoleTable";
// #endregion

// *** RTK/Service Layer(s) ***
// #region [RTK Customizable Services]
import {
  useDeleteRabbitHoleMutation,
  useFetchAllRabbitHolesQuery,
  useAddRabbitHoleMutation,
  useChangeRabbitHoleStatusMutation,
  useUpdateRabbitHoleMutation,
} from '../../features/rabbitHoleSlice';
// #endregion

export default function RabbitHoleControl() {
  // #region //* [Local State]
  const [projectId, setProjectId] = useState(1);
  const [projectName, setProjectName] = useState('Unknown');
  const [projectImageURL, setProjectImageURL] = useState('');
  const location = useLocation();
  const [displayGrid, setDisplayGrid] = React.useState(false);
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  // TODO: Change for production
  const tempBaseDir = 'http://localhost:8000/';
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], loading } = useFetchAllRabbitHolesQuery(projectId);
  const [deleteRabbitHole] = useDeleteRabbitHoleMutation();
  const [addRabbitHole] = useAddRabbitHoleMutation();
  const [chgRabbitHole] = useChangeRabbitHoleStatusMutation();
  const [updateRabbitHole] = useUpdateRabbitHoleMutation();
  // #endregion

  useEffect(() => { 
    console.log("Avatar URL: ", location.state);
    if (location.state !== null && location.state.projectId !== undefined) {
      setProjectId(location.state.projectId);
      setProjectName(location.state.projectName);
      setProjectImageURL(tempBaseDir + location.state.projectImage);
    }
  }, [location]);

  // #region //* [Event Handlers]
  const addOrEdit = (record, resetForm) => {
    record = { ...record, project_id: projectId }
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
    setRecordForEdit(record);
    setOpenPopup(true)
  };
  const handleDisplay = () => {
    setDisplayGrid(!displayGrid);
  }
  const handleStatusChange = (id, field, newSts) => {
    console.log("Changing status of " + field + " to " + newSts);
    if (field === 'solution') {
      chgRabbitHole({ id, solution: newSts })
    } else {
      chgRabbitHole({ id, completed: newSts })
    }
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
        componentTitle={`Rabbit Holes for ${projectName}`}
        avatarIcon="image"
        avatarImage={projectImageURL}
        // avatarImage={<VerticalAlignBottomIcon />}
        addFab={true}
        returnFab={true}
        toggleFab={true}
        toggleStatus={displayGrid}
        // searchBar={true}
        handleAdd={handleAdd}
        handleDisplay={handleDisplay}
      />

      <Box
      >
        <Sheet
        sx={{borderRadius: '10px'}}
        >
      {/* //* Handle Display here */}
      <Typography level="body" sx={{ textAlign: 'center' }}>
        {displayGrid
          ? "Grid"
          // ? <RabbitHoleGrid projectId={projectId} handleEdit={handleEdit} handleDelete={handleDelete} />
          // : "Table"
          : <RabbitHoleTable 
              projectId={projectId} 
              handleEdit={handleEdit} 
              handleDelete={handleDelete} 
              handleStatusChange={handleStatusChange} />
        }
      </Typography>

        </Sheet>
      </Box>



      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={"RabbitHole"} titleColor={"darkblue"} pageWidth={'md'} >
        <PageForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </PageDialog>
      <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

    </Box>

  )

}