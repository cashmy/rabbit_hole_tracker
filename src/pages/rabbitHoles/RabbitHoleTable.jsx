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
  Tooltip,
  Typography,
} from '@mui/joy';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { flexbox } from '@mui/system';


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
// #endregion

// * Table Columns
const columnCells = [
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
  const { projectId, handleEdit, handleDelete, handleStatusChange, handleSolution } = props;
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

  const handleSltn = (item) => {
    handleSolution(item);
  }


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
                          ? "warning"
                          : record.log_type === "t"
                            ? "success"
                            : "neutral"}
                    >

                      {record.log_type === "i"
                        ? "impediment"
                        : record.log_type === "d"
                          ? "distraction"
                          : record.log_type === "t"
                            ? "task"
                            : "unclassified"}
                    </Chip>
                  </TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>{record.rating}</TableCell>
                  <TableCell>{record.solution &&
                    <Tooltip 
                      arrow
                      variant="outlined"
                      color="primary"
                      title={record.solution.description} 
                      >
                      <Chip
                        startDecorator={<EmojiObjectsIcon />}
                        variant="solid"
                        color="success"
                      >{record.solution.type}</Chip>
                    </Tooltip>
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
                      onClick={() => handleSltn(record)}
                    >
                      <EmojiObjectsIcon sx={{ color: "green" }} />
                    </Controls.ActionButton>

                    {/* //& Done */}
                    <Controls.ActionButton
                      tooltipText={doneToolTip}
                      size="md"
                      onClick={() => handleStatusChange(record.id, !record.completed)}
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