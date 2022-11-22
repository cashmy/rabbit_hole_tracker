/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-17 22:22:03
 * @modify date 2022-11-17 22:22:03
 * @desc Admin for Image Library maintanence.
 * @desc //* Original Version!!!
 */

// #region [General Imports]
import { useState } from 'react';
import { format } from 'date-fns';
// * Joy UI
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardCover,
  CardOverflow,
  ListItemDecorator,
  Menu,
  MenuItem,
  // Typography
} from '@mui/joy'
import { Typography } from '@mui/material';
import React from 'react'

// * Mui Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// * Components
import TitleBar from '../../components/titleBar';
import NoImage from '../../assets/images/no_image.png';
import Notification from '../../components/controls/Notification';
import Controls from '../../components/controls/Controls';
// #endregion

// #region [Customizable imports]
import PageForm from "./ImageForm";
import PageDialog from '../page_dialog';
// #endregion

// *** RTK/Service Layer(s) ***
// #region [RTK Customizable Services]
import {
  useDeleteImageMutation,
  useFetchAllImagesAdminQuery,
  useFetchAllImagesByUserQuery,
  useAddImageMutation,
  useUpdateImageMutation,
} from '../../features/imageLibrarySlice';
// #endregion


export default function ImageLibraryTableV1() {

  // #region //* [Local State]
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [currentItem, setCurrentItem] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const open = Boolean(anchorEl);

  const tempBaseDir = 'http://localhost:8000/';
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], loading } = useFetchAllImagesAdminQuery();
  const [deleteImage] = useDeleteImageMutation();
  const [addImage] = useAddImageMutation();
  const [updateImage] = useUpdateImageMutation();
  // #endregion

  // * Helper function to convert "record" to "formData"
  // Since Django converts the name to a relative path, 
  //    and the image is stored in the "media" folder,
  //    the image itself does not need to be sent to the server for updates.
  //    Only the "alt_text" field needs to be sent.
  //
  // The "file_name" is converted to the fileObject from the event.target.files[0] object.
  //    This is only required for Add mode.
  // The record is converted to a formData object for the backend server.
  //
  const convertToFormData = (obj, mode) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      if (key == 'file_name') {
        if (mode !== 'add') {
          //skip the file_name field
        } else {
          formData.append(key, obj[key]);
        }
      } else {
        if((key == 'user' || key == 'user_id') && obj[key] == null){
          formData.append(key, 2);
        } else {
        formData.append(key, obj[key]);
        }
      }
      // formData.append('user', 2);
      // formData.append('user_id', 2);
    });
    const body = {
      id: obj.id,
      formData
    }
    return body;
  };

  // #region //* [Event Handlers]
  const addOrEdit = (record, resetForm) => {
    let close = false
    if (record.id === 0) {
      addImage(convertToFormData(record, 'add'))
      resetForm()
    }
    else {
      updateImage(convertToFormData(record, 'edit'))
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
        "Are you sure you want to delete this Image?",
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
    deleteImage(id)
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
  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  // #endregion

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 1.5,
      }}
    >
      {/* //* Page: Card Table Header */}
      <TitleBar
        componentTitle="Image Library (Deprecated)"
        avatarIcon="icon"
        avatarImage={<ImageTwoToneIcon />}
        addFab={true}
        searchBar={true}
        handleAdd={handleAdd}
      />

      {/* //* Page: Card Table Body */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        data.map((item, index) => (
          <Card
            key={index}
            sx={{
              '--Card-radius': (theme) => theme.vars.radius.sm,
              boxShadow: 'none',
              width: '150px'
            }}
          >
            <CardOverflow>
              {/* //& Card Image */}
              <AspectRatio ratio="4/3" color="primary">
                <CardCover>
                  <img
                    alt={item.image != "" && item.image != null ? item.image.alt_text : item.name}
                    src={item.image != ""
                      ? tempBaseDir + item.file_name
                      : NoImage}
                  />
                </CardCover>
              </AspectRatio>
              {/* //& Card Data & Actions*/}
              <CardContent
                sx={{
                  mt: 'auto',
                  flexGrow: 0,
                  flexDirection: 'column',
                  alignItems: 'end',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    pt: 2,
                  }}
                >
                  <Typography variant="body3">
                    {(item.alt_text.length > 13) && (item.id != 1)
                      ? item.alt_text.substring(0, 11) + '...'
                      : item.alt_text}
                  </Typography>
                  {/* //& MoreVertical */}
                  {item.id != 1 &&
                    <Controls.ActionButton
                      size="sm"
                      tooltipText="More options"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      aria-label={`more options for ${item.name}`}
                      onClick={(e) => {
                        handleMenuClick(e, item);
                      }}
                    >
                      <MoreVertIcon sx={{ color: 'darkmagenta' }} />
                    </Controls.ActionButton>
                  }
                </Box>
                {/* <Box sx={{ size: "sm" }}>
                </Box> */}
              </CardContent>
            </CardOverflow>
          </Card>
        ))
      )}

      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={"Image Details"} titleColor={"purple"} pageWidth={'md'} >
        <PageForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </PageDialog>
      <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        aria-labelledby="basic-menu-button"
        placement="bottom-end"
      >
        {/* //& Delete Item */}
        <MenuItem
          onClick={() => handleDelete(currentItem.id)}
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
        {/* //& Edit Item */}
        <MenuItem
          onClick={() => handleEdit(currentItem)}
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
      </Menu>

    </Box>
  )
}
