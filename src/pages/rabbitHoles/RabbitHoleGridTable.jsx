/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-12-06 22:22:03
 * @modify date 2022-12-06 22:22:03
 * @desc Project Details (Rabbit Holes) in a Grid format.
 */

// #region [General imports]
import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit'
import { Droppable } from '@hello-pangea/dnd';

//* Joy UI
import {
  Box,
  Sheet,
} from '@mui/joy';

// * Components
import SimpleTitleBar from '../../components/simpleTitleBar';
// #endregion

// #region [Customizable imports]
import RabbitHoleItem from './RabbitHoleItem';
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
export default function RabbitHoleGridTable(props) {
  // #region //* [Local State]
  const {
    projectId,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleSolution,
    handleSolutionDelete,
    titleText,
    bgColor,
    log_type
  } = props;
  // #endregion

  // #region // * [RTK Data requests]

  // Filter the cached results rather than add multiple "cached" lists
  // Use memoization of the cached results to avoid unnecessary renders
  const selectRHByType = useMemo(() => {
    const emptyArray = []
    return createSelector(
      res => res.data,
      (res, log_type) => log_type,

      (data, log_type) => data?.filter(x => x.log_type === log_type) ?? emptyArray,

    )
  }, [])

  const { data = [], loading } = useFetchAllRabbitHolesQuery(projectId, {
    selectFromResult: result => ({
      ...result,
      data: selectRHByType(result, log_type)
    })
  });

  // Sort the data by descending "rating" (5 = highest value)
  data.sort((a, b) => {
    if (b.rating < a.rating) {
      return -1; // Need to switch elements
    }
    if (b.rating > a.rating) {
      return 1; // In correct order
    }
    return 0; // They equal
  })
  // #endregion


  const handleSltn = (item) => {
    console.log("Item (grid): ", item)
    if (item.solution) {
      handleSolutionDelete(item);
    } else {
      handleSolution(item);
    }
  }

  return (
    <Box sx={{
      width: "40vw",
      display: 'flex',
      flexDirection: 'column'
    }
    }>
      <Sheet
        sx={{
          ml: 2,
          mt: 2,
          borderRadius: '10px',
          width: '100%',
          height: '90%',
          bgcolor: 'background.componentBg',
        }}>
        {/* <Box sx={{ mt: 2 }}> */}
        <SimpleTitleBar titleText={titleText} bgcolor={`${bgColor}`} />
        {/* </Box> */}

        <Droppable droppableId={log_type}>
          {(provided, snapshot) => (
            <Sheet
              ref={provided.innerRef}
              {...provided.droppableProps}
              isdraggingover={toString(snapshot.isDraggingOver)}
              sx={{
                ml: 3, mr: 3,
                borderRadius: '10px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: bgColor,
                // borderColor: tstClr,
                overflowY: 'auto',
                height: '80%'
              }}>
              {loading
                ? (<Typography> Loading ... </Typography>)
                : (data.map((record, index) => 
                (    
                  <RabbitHoleItem key={index}
                    item={{
                      ...record,
                      solution_id: record.solution_id || null
                    }}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleStatusChange={handleStatusChange}
                    handleSolution={handleSolution}
                    handleSltn={handleSltn}
                    index={index}
                  />
                )
                ))
              }
            </Sheet>
          )}
        </Droppable>
      </Sheet>
    </Box >

  )
}