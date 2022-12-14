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
  Box,
  Sheet,
  Typography
} from '@mui/joy'
import { maxWidth } from '@mui/system';

// * Mui Icons

// * Components
import Controls from '../../components/controls/Controls';
import TitleBar from '../../components/titleBar';
import Notification from '../../components/controls/Notification';
// #endregion

// #region [Customizable imports]
import PageForm from "./RabbitHoleForm";
import SolutionForm from "../solutions/SolutionForm";
import PageDialog from '../page_dialog';
import RabbitHoleTable from "./RabbitHoleTable";
import RabbitHoleGrid from "./RabbitHoleGrid";

// #endregion

// #region [RTK Customizable Services]
import {
  useDeleteRabbitHoleMutation,
  useFetchAllRabbitHolesQuery,
  useAddRabbitHoleMutation,
  useChangeRabbitHoleMutation,
  useUpdateRabbitHoleMutation,
} from '../../features/rabbitHoleSlice';
import {
  useAddSolutionMutation,
  useUpdateSolutionMutation,
  useDeleteSolutionMutation,
} from '../../features/solutionSlice';
// #endregion

// ^ MAIN COMPONENT
export default function RabbitHoleControl() {
  // #region //* [Local State]
  const [projectId, setProjectId] = useState(1);
  const [projectName, setProjectName] = useState('Unknown');
  const [projectImageURL, setProjectImageURL] = useState('');
  const location = useLocation();
  const [displayGrid, setDisplayGrid] = React.useState(false);
  const [openPopup, setOpenPopup] = useState(false)
  const [openPopup2, setOpenPopup2] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [solutionForEdit, setSolutionForEdit] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [currentItem, setCurrentItem] = useState(null);
  // TODO: Change for production
  const tempBaseDir = 'http://localhost:8000/';
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], isLoading } = useFetchAllRabbitHolesQuery(projectId);
  const [deleteRabbitHole] = useDeleteRabbitHoleMutation();
  const [addRabbitHole] = useAddRabbitHoleMutation();
  const [chgRabbitHole] = useChangeRabbitHoleMutation();
  const [updateRabbitHole] = useUpdateRabbitHoleMutation();
  const [addSolution] = useAddSolutionMutation();
  const [updateSolution] = useUpdateSolutionMutation();
  const [deleteSolution] = useDeleteSolutionMutation();
  // #endregion

  useEffect(() => {
    if (location.state !== null && location.state.projectId !== undefined) {
      setProjectId(location.state.projectId);
      setProjectName(location.state.projectName);
      setProjectImageURL(tempBaseDir + location.state.projectImage);
    }
  }, [location]);

  // #region //* [Event Handlers]
  const addOrEdit = (record, resetForm) => {
    record = { 
      ...record, 
      project_id: projectId, 
      project: projectId,
      solution: record.solution || null ,
      solution_id: record.solution_id || null 
    }
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
        "Are you sure you want to delete this detail item - Rabbit Hole?",
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
  const handleStatusChange = (id, newSts) => {
    chgRabbitHole({ id, completed: newSts })
  }
  const handleSolution = (record) => {
    setCurrentItem(record.id);
    // 1 Determine add/edit mode
    if (record.solution === null) {
      setSolutionForEdit(null);
    } else {
      // 2 Set recordForEdit
      setSolutionForEdit(record.solution)
    }
    // 3 Open Popup
    setOpenPopup2(true)
  }
  const solutionAddOrEdit = (solution, resetForm) => {
    console.log("Solution: ", solution)
    let close = false
    if (solution.id === 0) {
      addSolution(solution).then((res) => {
        chgRabbitHole({ id: currentItem, solution_id: res.data.id })
      }
      )

      close = true
    }
    else {
      updateSolution(solution)
      close = true
    }
    if (close) {
      resetForm()
      setSolutionForEdit(null);
      setOpenPopup2(false) // Close Popup modal
    }

    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    })
  };
  const handleSolutionDelete = (record) => {
    setConfirmDialog({
      isOpen: true,
      title:
        "Are you sure you want to delete this Solution?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        setCurrentItem(record.id)
        onSolutionDelete(record.solution.id);
      },
    })
  };
  const onSolutionDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteSolution(id).then((res) => {
      chgRabbitHole({ id: currentItem, solution: null })
    })
    setNotify({
      isOpen: true,
      message: "Solution deleted",
      type: "error",
    });
  };

  const handleLogTypeChange = (id, log_type) => {
    chgRabbitHole({ id, log_type})
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
          sx={{ borderRadius: '10px' }}
        >
          {/* //* Handle Display here */}
          <Typography level="body" sx={{ textAlign: 'center' }}>
            {displayGrid
              // Grid View
              ? <RabbitHoleGrid 
                projectId={projectId} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
                handleStatusChange={handleStatusChange}
                handleSolution={handleSolution} 
                handleSolutionDelete={handleSolutionDelete}
                setCurrentItem={setCurrentItem}
                handleLogTypeChange={handleLogTypeChange}
                />
              // : "Table"
              : <RabbitHoleTable
                projectId={projectId}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleStatusChange={handleStatusChange}
                handleSolution={handleSolution}
                handleSolutionDelete={handleSolutionDelete}
                setCurrentItem={setCurrentItem}
              />
            }
          </Typography>

        </Sheet>
      </Box>



      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={"RabbitHole"} titleColor={"darkblue"} pageWidth={'md'} >
        <PageForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </PageDialog>
      <PageDialog openPopup={openPopup2} setOpenPopup={setOpenPopup2} title={"Solution"} titleColor={"green"} pageWidth={'sm'} >
        <SolutionForm recordForEdit={solutionForEdit} addOrEdit={solutionAddOrEdit} />
      </PageDialog>
      <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

    </Box>

  )

}