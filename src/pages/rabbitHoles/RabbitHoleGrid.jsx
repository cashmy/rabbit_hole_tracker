/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-22 22:22:03
 * @modify date 2022-11-22 22:22:03
 * @desc Project Details (Rabbit Holes) in a Grid format.
 */

// #region [General imports]
import { useState, useEffect } from 'react';
//* Joy UI
import {
  Box,
  Chip,
  Sheet,
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
import colors from '@mui/joy/colors';


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
import SimpleTitleBar from '../../components/simpleTitleBar';
// #endregion

// #region [Customizable imports]
// import PageForm from "./RabbitHoleForm";
// import PageDialog from '../page_dialog';
import useTable from "../../hooks/useTable";
import RabbitHoleItem from './RabbitHoleItem';
// #endregion

// #region [Customizable texts]
const componentTitle = "Rabbit Hole Logs";
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
  const { projectId, handleEdit, handleDelete, handleStatusChange, handleSolution, handleSolutionDelete, setCurrentItem } = props;
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
    if (item.solution) {
      handleSolutionDelete(item);
    } else {
      handleSolution(item);
    }
  }

  return (
    <Box
      sx={{
        m: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: 'calc(100vh - 200px)',
      }}
    >
      {/* //& Impediments */}
      <Box sx={{
        width: "40vw",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Sheet
          sx={{
            m: 2,
            borderRadius: '10px',
            width: '100%',
            height: '90%',
            bgcolor: 'background.componentBg',
          }}>
          {/* <Box sx={{ mt: 2 }}> */}
          <SimpleTitleBar titleText={'Impediments'} bgcolor={colors.red[600]} />
          {/* </Box> */}
          <Sheet
            sx={{
              ml: 3, mr: 3,
              borderRadius: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.red[600],
              overflowY: 'auto',
              height: '80%'
            }}>
              <RabbitHoleItem 
                item={{
                  id: 1, 
                  name: "This the name", 
                  ranking: 2, 
                  solution: {
                    id: 1,
                    type: 'S'
                  },
                  completed: "true"
                }}
                index={1}
              />
          </Sheet>
        </Sheet>
      </Box>

      {/* //& Distractions */}
      <Box sx={{
        width: "40vw",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Sheet
          sx={{
            m: 2,
            borderRadius: '10px',
            width: '100%',
            height: '90%',
            bgcolor: 'background.componentBg',
          }}>
          <SimpleTitleBar titleText={'Distractions'} bgcolor={colors.yellow[500]} />
          <Sheet
            sx={{
              ml: 3, mr: 3,
              borderRadius: '10px',
              // bgcolor: 'background.componentBg',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.yellow[500],
              overflowY: 'auto',
              height: '80%'
            }}>
            Items
          </Sheet>
        </Sheet>
      </Box>

      {/* //& External Tasks */}
      <Box sx={{
        width: "40vw",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Sheet
          sx={{
            ml: 2,
            borderRadius: '10px',
            width: '100%',
            height: '90%',
            bgcolor: 'background.componentBg',
          }}>
          <SimpleTitleBar titleText={'External Tasks'} bgcolor={colors.green[600]} />
          <Sheet
            sx={{
              ml: 3, mr: 3,
              borderRadius: '10px',
              // bgcolor: 'background.componentBg',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.green[600],
              overflowY: 'auto',
              height: '80%'
            }}>
          </Sheet>
        </Sheet>
      </Box>

      {/* //& Unclassified */}
      <Box sx={{
        width: "40vw",
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Sheet
          sx={{
            ml: 2,
            borderRadius: '10px',
            width: '100%',
            height: '90%',
            bgcolor: 'background.componentBg',
          }}>
          <SimpleTitleBar titleText={'Unclassified'} bgcolor={colors.grey[700]} />
          <Sheet
            sx={{
              ml: 3, mr: 3,
              borderRadius: '10px',
              // bgcolor: 'background.componentBg',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.grey[700],
              overflowY: 'auto',
              height: '80%'
            }}>
          </Sheet>
        </Sheet>
      </Box>

    </Box>
  )
}