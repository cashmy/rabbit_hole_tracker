/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-22 22:22:03
 * @modify date 2022-11-22 22:22:03
 * @desc Project Details (Rabbit Holes) in a Grid format.
 */

// #region [General imports]
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
  } = props;
  // #endregion

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

    </Box>
  )
}