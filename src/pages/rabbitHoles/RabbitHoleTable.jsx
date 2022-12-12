/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-07 22:22:03
 * @modify date 2022-12-06 23:16:00
 * @desc roject Details (Rabbit Holes) in a standard Table format.
 */

// #region [General imports]
import { useState } from 'react';
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
import Notification from '../../components/controls/Notification';
// #endregion

// #region [Customizable imports]
import useTable from "../../hooks/useTable";
// #endregion

// #region [Customizable texts]
const searchText = "Search by Name, Type, or Description";
const editToolTip = "Edit an item";
const deleteToolTip = "Delete an item";
const doneToolTip = "Toggle Completion Status";
const solutionToolTip = "Add/Dlt a solution to an item";
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
  { id: 'solution', label: 'Sltn' },  // Can't sort on null values (?)
  { id: 'completed', label: 'Cmplt' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

// ^ MAIN COMPONENT
export default function RabbitHoleTable(props) {
  // #region //* [Local State]
  const {
    projectId,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleSolution,
    handleSolutionDelete,
  } = props;
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], isLoading } = useFetchAllRabbitHolesQuery(projectId);
  // #endregion

  // & Table Constants
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(data, columnCells, filterFn,);

  const handleSltn = (item) => {
    if (item.solution) {
      handleSolutionDelete(item);
    } else {
      handleSolution(item);
    }
  }


  return (
    <Box sx={{ display: flexbox, m: 1, }}>

      <TableContainer>
        <TblContainer stickyHeader={true}>
          <TblHead />
          <TableBody>
            {isLoading ? (
              <TableRow key="999">
                <TableCell>
                  <Typography> isLoading ... </Typography>
                </TableCell>
              </TableRow>
            ) : (
              recordsAfterPagingAndSorting().map((record, index) => (
                <TableRow key={index}>
                  {/* //& Log_Type  */}
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

                  <TableCell sx={{ maxWidth: '240px' }}>{record.name}</TableCell>
                  <TableCell sx={{ maxWidth: '400px' }}>{record.description}</TableCell>
                  <TableCell>{record.rating}</TableCell>

                  {/* //& Solution! */}
                  <TableCell>{record.solution &&
                    <Tooltip
                      arrow
                      variant="outlined"
                      color="primary"
                      title={
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: 320,
                            justifyContent: 'center',
                            p: 1,
                          }}
                        >
                          <Typography
                            fontSize="sm"
                            textColor="blue"
                          // color="neutral"
                          >
                            {record.name}
                          </Typography>
                          <Typography
                            fontSize="sm"
                            textColor="neutral.600"
                          >
                            {record.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
                            <EmojiObjectsIcon color="success" />
                            <Typography fontWeight='lg' fontSize='sm'
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                              }}
                            >
                              {record.solution.description}
                            </Typography>
                          </Box>

                        </Box>
                      }
                    >
                      <Chip
                        startDecorator={<EmojiObjectsIcon />}
                        variant="solid"
                        color="success"
                        onClick={() => handleSolution(record)}
                      >{record.solution.type}</Chip>
                    </Tooltip>
                  }
                  </TableCell>

                  {/* //& Completed Status */}
                  < TableCell > {
                    record.completed &&
                    <Chip
                      startDecorator={<DoneAllIcon />}
                      variant="solid"
                      color="primary"
                    />
                  }
                  </TableCell>

                  {/* // *Actions */}
                  < TableCell >

                    {/* //& Solution */}
                    < Controls.ActionButton
                      tooltipText={solutionToolTip}
                      size="md"
                      onClick={() => handleSltn(record)}>
                      <EmojiObjectsIcon sx={{
                        color: record.solution ? "red" : "green"
                      }} />
                    </Controls.ActionButton>

                    {/* //& Done */}
                    <Controls.ActionButton
                      tooltipText={doneToolTip}
                      size="md"
                      onClick={() => handleStatusChange(record.id, !record.completed)}>
                      <DoneIcon sx={{ color: "darkorange" }} />
                    </Controls.ActionButton>

                    {/* //& Edit */}
                    <Controls.ActionButton
                      tooltipText={editToolTip}
                      size="md"
                      onClick={() => handleEdit(record)}>
                      <EditOutlinedIcon sx={{ color: "darkcyan" }} />
                    </Controls.ActionButton>

                    {/* //& Delete */}
                    <Controls.ActionButton
                      tooltipText={deleteToolTip}
                      size="md"
                      onClick={() => handleDelete(record.id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </Controls.ActionButton>

                  </TableCell>
                </TableRow>
              ))
            )
            }

          </TableBody>
        </TblContainer>
        <TblPagination />

      </TableContainer >

      {/* //* Dialogs, Modals, Menus & Popups */}
      < Notification notify={notify} setNotify={setNotify} />
    </Box >
  )
}