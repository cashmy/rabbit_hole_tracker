/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-24 22:22:03
 * @modify date 2022-12-06 22:22:03
 * @desc Rabbit Hole Item component
 * @desc This component is designed to be used in a table. 
 * @desc It is for a "single" record only so that drag and drop functionality 
 * @desc    can be implemented.
 */

// #region [General Imports]
import { useState, Fragment } from "react";
import { Draggable } from '@hello-pangea/dnd';
import {
  Box,
  Chip,
  Menu,
  MenuItem,
  ListItemDecorator,
  Tooltip,
  Typography,
} from '@mui/joy'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import Controls from "../../components/controls/Controls";
import colors from '@mui/joy/colors';
// #endregion

// #region [Customizable texts]
const componentTitle = "Rabbit Hole Logs";
const searchText = "Search by Name, Type, or Description";
const editToolTip = "Edit an item";
const deleteToolTip = "Delete an item";
const doneToolTip = "Toggle Completion Status";
const solutionToolTip = "Add/Dlt a solution to an item";
// #endregion

export default function RabbitHoleItem(props) {
  const {
    item,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleSolution,
    handleSltn,
    index
  } = props
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleItemEdit = () => {
    console.log("Item data: ", item)
    handleEdit(item);
    handleMenuClose();
  }


  return (
    <Fragment>
      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isdragging={toString(snapshot.isDragging)}

            sx={{
              borderRadius: '10px',
              display: 'grid',
              flexDirection: 'row',
              gridTemplateColumns: '.5fr 2.5fr .45fr .35fr .15fr .20fr .35fr',
              m: 1,
              p: 1,
              bgcolor: !snapshot.isDragging ? 'background.componentBg' : colors.grey[700],
              // justifyContent: 'space-evenly'
              justifyItems: 'start',
              alignItems: 'center'
            }}
          >
            {/* //& Item Rating (1-5) */}
            <Box sx={{ ml: 2 }}>{item.rating}</Box>
            {/* //& Name (& Description in toolip) */}
            <Box>
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
                    }}>
                    <Typography
                      fontSize="sm"
                      textColor="neutral.400"
                    >
                      {item.description}
                    </Typography>
                  </Box>
                }
              >
                <Typography> {item.name}</Typography>
              </Tooltip>
            </Box>
            {/* //& Solution Chip (& Solution text in tooltip) */}
            <Box>
              {item.solution &&
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
                      <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
                        <EmojiObjectsIcon color="success" />
                        <Typography fontWeight='lg' fontSize='sm'
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                        >
                          {item.solution.description}
                        </Typography>
                      </Box>

                    </Box>
                  }
                >
                  <Chip
                    startDecorator={<EmojiObjectsIcon />}
                    variant="solid"
                    color="success"
                    onClick={() => handleSolution(item)}
                  >{item.solution.type}</Chip>
                </Tooltip>
              }
            </Box>
            {/* //& Complete Chip */}
            <Box>
              {item.completed &&
                <Chip
                  startDecorator={<DoneAllIcon />}
                  variant="solid"
                  color="primary"
                />
              }
            </Box>
            {/* //& Dropdown Menu items */}
            <Controls.ActionButton
              tooltipText="More options"
              placement="top"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              aria-label={`more options for ${item.name}`}
              onClick={handleMenuClick}
            >
              <MoreVertIcon sx={{ color: 'darkmagenta' }} />
            </Controls.ActionButton>
            {/* //& Solution */}
            < Controls.ActionButton
              tooltipText={solutionToolTip}
              size="md"
              onClick={() => handleSltn(item)}>
              <EmojiObjectsIcon sx={{
                color: item.solution ? "red" : "green"
              }} />
            </Controls.ActionButton>
            {/* //& Done */}
            <Controls.ActionButton
              tooltipText={doneToolTip}
              size="md"
              onClick={() => handleStatusChange(item.id, !item.completed)}>
              <DoneIcon sx={{ color: "darkorange" }} />
            </Controls.ActionButton>
          </Box>
        )}
      </Draggable>

      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      // MenuListProps={{
      //   'aria-labelledby': 'basic-button',
      // }}
      >
        {/* //& Edit Item */}
        <MenuItem
          onClick={handleItemEdit}
          variant="plain"
          color="neutral"
          aria-label="edit image"
          size="sm"
        >
          <ListItemDecorator>
            <EditOutlinedIcon style={{ color: "green" }} />
          </ListItemDecorator>
          <Typography level="body2">
            Edit
          </Typography>
        </MenuItem>
        {/* //& Delete Item */}
        <MenuItem
          onClick={() => handleDelete(item.id)}
          variant="plain"
          color="neutral"
          aria-label="delete image"
          size="sm"
        >
          <ListItemDecorator>
            <DeleteIcon style={{ color: "red" }} />
          </ListItemDecorator>
          <Typography level="body2">
            Delete
          </Typography>
        </MenuItem>
      </Menu>

    </Fragment>
  )
}
