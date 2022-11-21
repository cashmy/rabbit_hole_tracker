/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-07 22:22:03
 * @modify date 2022-11-21 22:22:03
 * @desc Basic Table page for the Rabbit Hole app.
 */

// #region [General imports]
import { useState, useEffect } from 'react';
//* Joy UI
import {
  Box,
  Chip,
  Typography,
} from '@mui/joy';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'


// * Mui Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SearchIcon from '@mui/icons-material/Search';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// * Components
import Controls from '../../components/controls/Controls';
import TitleBar from '../../components/titleBar';
import Notification from '../../components/controls/Notification';
// #endregion

// #region [Customizable imports]
// import PageForm from "./RabbitHoleForm";
// import PageDialog from '../page_dialog';
import useTable from "../../hooks/useTable";
// #endregion

// #region [Customizable texts]
const componentTitle = "Rabbit Hole Logs";
const detailTitle = "Rabbit Hole Log Detail";
const detailTitle2 = "Rabbit Hole Log Solution";
const searchText = "Search by Name, Type, or Description";
const editToolTip = "Edit an item";
const deleteToolTip = "Delete an item";
const doneToolTip = "Complete an item";
const solutionToolTip = "Add/Edit a solution to an item";
// #endregion

// #region [RTK/Service Layer]
import {
  useFetchAllRabbitHolesQuery,
} from '../../features/rabbitHoleSlice';
import { flexbox } from '@mui/system';
// #endregion

// * Table Columns
const columnCells = [
  // { id: 'id', label: 'ID', numeric: true, hidden: true },
  // { id: 'project', label: 'Project ID' },
  { id: 'log_type', label: 'Type' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'rating', label: 'Rating' },
  { id: 'solution', label: 'Sltn' },
  { id: 'completed', label: 'Cmplt' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

// ^ MAIN COMPONENT
export default function RabbitHoleTable(props) {
  // #region //* [Local State]
  const { projectId = 1, handleEdit, handleDelete, handleStatusChange } = props;
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], loading } = useFetchAllRabbitHolesQuery(projectId);
  // #endregion

  // & Table Constants
  const {
    TblContainer,
    TblHead,
    recordsAfterPagingAndSorting
  } = useTable(data, columnCells, filterFn,);

  // #region // * [Event Handlers]
  const handleComplete = (record) => {
    handleStatusChange(record.id, "completed", !record.solution)
    setNotify({
      isOpen: true,
      message: "Completion status changed",
      type: "success",
    });
  };
  const handleSearch = e => {
    let target = e.target;
    // state can't store functions, so we are storing an object with the function internally defined.
    setFilterFn({
      fn: items => {
        // target.value is the search box contents
        if (target.value === "")
          return items;
        else
          return items.filter(
            (x) =>
              x.log_type
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.name
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.description
                .toLowerCase()
                .includes(target.value.toLowerCase())
          )
      }
    })
  };
  // #endregion

  return (
    <Box sx={{ display: flexbox, m: 1, }}>

      <TableContainer>
        <TblContainer stickyHeader={true}>
          <TblHead />
          <TableBody>
            {loading ? (
              <TableRow key="999">
                <TableCell>
                  <Typography> Loading ... </Typography>
                </TableCell>
              </TableRow>
            ) : (
              recordsAfterPagingAndSorting().map((record, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{record.id}</TableCell>
                  <TableCell>{record.project.id}</TableCell> */}
                  <TableCell>
                    <Chip
                    variant="solid"
                    color={record.log_type === "i" 
                      ? "danger" 
                      : record.log_type === "d" 
                        ?  "warning" 
                        : record.log_type ==="t"
                          ? "success" 
                          : "secondary"}
                    >
                      
                      {record.log_type === "i" 
                      ? "impediment" 
                      : record.log_type === "d" 
                        ?  "distraction" 
                        : record.log_type ==="t"
                          ? "task" 
                          : "unknown"}
                    </Chip>
                  </TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>{record.rating}</TableCell>
                  <TableCell>{record.solution &&
                    <Chip
                      startDecorator={<EmojiObjectsIcon />}
                      variant="solid"
                      color="success"
                    />
                  }
                  </TableCell>
                  <TableCell>{record.completed &&
                    <Chip
                      startDecorator={<DoneAllIcon />}
                      variant="solid"
                      color="primary"
                    />

                  }</TableCell>

                  {/* // *Actions */}
                  < TableCell >

                    {/* //& Solution */}
                    < Controls.ActionButton
                      tooltipText={solutionToolTip}
                      size="md"
                      onClick={() => handleStatusChange(record.id, "solution", !record.solution)}
                    >
                      <EmojiObjectsIcon sx={{ color: "green" }} />
                    </Controls.ActionButton>

                    {/* //& Done */}
                    <Controls.ActionButton
                      color="darkorange"
                      tooltipText={doneToolTip}
                      size="md"
                      onClick={() => handleStatusChange(record.id, "completed", !record.completed)}
                    >
                      <DoneIcon sx={{ color: "darkorange" }} />
                    </Controls.ActionButton>

                    {/* //& Edit */}
                    <Controls.ActionButton
                      tooltipText={editToolTip}
                      size="md"
                      onClick={() => handleEdit(record)}
                    >
                      <EditOutlinedIcon sx={{ color: "darkcyan" }} />
                    </Controls.ActionButton>

                    {/* //& Delete */}
                    <Controls.ActionButton
                      tooltipText={deleteToolTip}
                      size="md"
                      onClick={() => handleDelete(record.id)}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </Controls.ActionButton>

                  </TableCell>
                </TableRow>
              ))
            )
            }
          </TableBody>
        </TblContainer>

      </TableContainer>

      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  )
}