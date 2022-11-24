import { useState, Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/joy'
import {
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SearchIcon from '@mui/icons-material/Search';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import Controls from "../../components/controls/Controls";


export default function RabbitHoleItem(props) {
  const { item, index } = props
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
    handleEdit();
    handleMenuClose();
  }
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    let params = {
      headerId: headerId,
      id: task.id
    }
    deleteTemplateDetail(params)

    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
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


  return (
    <Fragment>
      {/* <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => ( */}
      <Box
        sx={{
          borderRadius: '10px',
          display: 'grid',
          flexDirection: 'row',
          gridTemplateColumns: '.5fr 2.5fr .5fr .5fr .5fr',
          m: 1,
          p: 1,
          bgcolor: 'background.componentBg',
          // justifyContent: 'space-evenly'
          justifyItems: 'start',
          alignItems: 'center'
        }}
      >
        <Box sx={{ ml: 2 }}>{item.ranking}</Box>
        <Box>{item.name}</Box>
        <Box>
          {item.solution &&
            <Chip
              startDecorator={<EmojiObjectsIcon />}
              variant="solid"
              color="success"
              onClick={() => handleSolution(record)}
            >{item.solution.type}</Chip>
          }
        </Box>
        <Box>
          {item.completed &&
            <Chip
              startDecorator={<DoneAllIcon />}
              variant="solid"
              color="primary"
            />
          }
        </Box>
        <IconButton
          // className={clsx({
          //   [classes.taskColorStandard]: !snapshot.isDragging,
          //   [classes.taskColorDragging]: snapshot.isDragging,
          // })}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleMenuClick}
          size="sm"
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      {/* )}
      </Draggable> */}

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
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleItemEdit}>
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText>
            Edit
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>
            Delete
          </ListItemText>
        </MenuItem>
      </Menu>

    </Fragment>
  )
}
