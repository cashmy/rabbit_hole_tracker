/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-22 22:22:03
 * @modify date 2022-11-22 22:22:03
 * @desc Project Details (Rabbit Holes) in a Grid format.
 */

// #region [General imports]
import { DragDropContext } from '@hello-pangea/dnd';

//* Joy UI
import {
  Box,
} from '@mui/joy';
import colors from '@mui/joy/colors';

// * Components
import RabbitHoleGridTable from './RabbitHoleGridTable';
// #endregion

// ^ MAIN COMPONENT
export default function RabbitHoleGrid(props) {
  // #region //* [Local State]
  const {
    projectId,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleSolution,
    handleSolutionDelete,
    handleLogTypeChange
  } = props;
  // #endregion

  const handleSltn = (item) => {
    if (item.solution) {
      handleSolutionDelete(item);
    } else {
      handleSolution(item);
    }
  }

  // * Handle "Dragging"
  const onDragEnd = (result) => {
    // Persist the changes made by the drag action
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    // Check to see if the user dropped the item back into its original position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // * Moving from list to another
    handleLogTypeChange(draggableId, destination.droppableId)
  };

  return (
    <Box
      sx={{
        m: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: 'calc(100vh - 200px)',
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>

        {/* //& Impediments */}
        <RabbitHoleGridTable
          bgColor={colors.red[600]}
          titleText="Impediments"
          projectId={projectId}
          log_type="i"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
          handleSolution={handleSolution}
          handleSolutionDelete={handleSolutionDelete}
          handleSltn={handleSltn}
        />

        {/* //& Distractions */}
        <RabbitHoleGridTable
          bgColor={colors.yellow[500]}
          titleText="Distractions"
          projectId={projectId}
          log_type="d"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
          handleSolution={handleSolution}
          handleSolutionDelete={handleSolutionDelete}
          handleSltn={handleSltn}
        />

        {/* //& Internal/External Tasks */}
        <RabbitHoleGridTable
          bgColor={colors.green[600]}
          titleText="Tasks"
          projectId={projectId}
          log_type="t"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
          handleSolution={handleSolution}
          handleSolutionDelete={handleSolutionDelete}
          handleSltn={handleSltn}
        />

        {/* //& Unclassified */}
        <RabbitHoleGridTable
          bgColor={colors.grey[700]}
          titleText="Unclassified"
          projectId={projectId}
          log_type="u"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
          handleSolution={handleSolution}
          handleSolutionDelete={handleSolutionDelete}
          handleSltn={handleSltn}
        />
      </DragDropContext>
    </Box>
  )
}