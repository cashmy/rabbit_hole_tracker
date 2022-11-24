/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-11-19 22:22:03
 * @modify date 2022-11-19 22:22:03
 * @desc Admin for Image Library maintanence.
 * @desc //* New Version 2!!!
 */

// #region [General Imports]
import React, { useState, Fragment, useEffect } from 'react';

// * Joy UI
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  CardCover,
  ListItemDecorator,
  Menu,
  MenuItem,
  Sheet,
  Typography
} from '@mui/joy'
// import { Typography } from '@mui/material';

// * Components
import ImageUploading from 'react-images-uploading';
import TitleBar from '../../components/titleBar';
import Notification from '../../components/controls/Notification';
import Controls from '../../components/controls/Controls';

// * Mui Icons
import BiotechIcon from '@mui/icons-material/Biotech';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// #endregion

// #region [Customizable imports]
import PageForm from "./ImageForm";
import PageDialog from '../page_dialog';
// #endregion

// #region [RTK Customizable Services]
import {
  useDeleteImageMutation,
  useFetchAllImagesAdminQuery,
  useFetchAllImagesByUserQuery,
  useAddImageMutation,
  useUpdateImageMutation,
} from '../../features/imageLibrarySlice';
// #endregion

// ^ MAIN COMPONENT
export default function ImageLibraryTable(props) {
  // #region //* [Local State]
  const {selectImage} = props;
  const [images, setImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [currentItem, setCurrentItem] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })


  const maxNumber = 69;
  const open = Boolean(anchorEl);

  const tempBaseDir = 'http://localhost:8000/';
  // #endregion

  // #region // * [RTK Data requests]
  const { data = [], loading } = useFetchAllImagesAdminQuery();
  const [deleteImage] = useDeleteImageMutation();
  const [addImage] = useAddImageMutation();
  const [updateImage] = useUpdateImageMutation();
  // #endregion

  // #region //* [Event Handlers]
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
        if ((key == 'user' || key == 'user_id') && obj[key] == null) {
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
  const handleImageAddAll = (imageList, onImageRemoveAll) => {
    let imageURL = {}
  
    imageList.forEach((image) => {
      let formData = new FormData();
      formData.append('file_name', image.file);
      formData.append('alt_text', image.file.name);
      formData.append('user', 2);
      formData.append('user_id', 2);
      formData.append('file_size', image.file.size);
      formData.append('mime_type', image.file.type);
    
      addImage(formData)
    })
    onImageRemoveAll()
  }
  const addOrEdit = (record, resetForm) => {
    let close = false

    updateImage(convertToFormData(record, 'edit'))
    close = true

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
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const handleClickEvent = (event, index, onImageUpdate, onImageRemove) => {
    if (event.shiftKey) onImageRemove(index)
    else onImageUpdate(index)
  }
  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  const handleSelection = (item) => {
    selectImage(item)
    // exit modal close.
  }
  // #endregion


  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 2,
      }}
    >
      {/* //* Page: Test Component Header */}
      <TitleBar
        componentTitle="Image Library"
        avatarIcon="icon"
        avatarImage={<ImageTwoToneIcon />}
      />

      {/* //* Component Pannel */}
      <Box
        sx={{
          // maxWidth: '75vw',
          width: 'calc(100vw - 240px)',
          height: 'calc(100vh - 180px)',
        }}
      >
        <Sheet
          elevation={10}
          sx={{
            borderRadius: '10px',
            overflowY: 'auto',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '6fr 3fr',
            }}>

            {/* //* Display Pane of existing Images */}
            <Box
              sx={{
                height: 'calc(100vh - 220px)',
                m: 2,
                // backgroundColor: 'grey.400',
                borderRadius: '10px',

              }}
            >
              <Sheet
                sx={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '100%',
                  bgcolor: 'background.componentBg',
                  overflowY: 'auto',
                  borderRadius: '10px',
                }}
              >
                <Box
                  sx={{
                    m: 3,
                  }}
                  display="grid"
                  gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))'
                >
                  {/* //& Page: Card Table Body */}
                  {loading ? (
                    <Typography>Loading...</Typography>
                  ) : (
                    data.map((item, index) => (
                      <Card
                        key={index}
                        sx={{
                          m: 1,
                          p: 1,
                          '--Card-radius': (theme) => theme.vars.radius.sm,
                          boxShadow: 'none',
                          width: '150px',
                        }}
                      >
                        {/* //& Card Image */}
                        <AspectRatio ratio="4/3" color="primary">
                          <CardCover
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleSelection(item) }
                          >
                            <img
                              alt={item.image != "" && item.image != null ? item.image.alt_text : item.name}
                              src={item.image != ""
                                ? tempBaseDir + item.file_name
                                : NoImage}
                            />
                          </CardCover>
                        </AspectRatio>
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
                              display: 'flex',
                              flex: 'flex-row',
                              alignItems: 'center',
                            }} >
                            <Typography level="body2">
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
                        </CardContent>
                      </Card>
                    )))}

                </Box>
              </Sheet>
            </Box>

            {/* //* Right Hand Column */}
            <Box
              sx={{
                m: 2,
                borderRadius: '10px',
                display: 'grid',
                gridTemplateRows: '2fr 6fr',
              }}
            >
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <Fragment>
                    {/* //& Click - Drag/Drop Button */}
                    <Box
                      sx={{
                        mb: 2,
                        borderRadius: '10px',
                        display: 'flex-column',
                      }}
                    >
                      <Button
                        onClick={onImageUpload}
                        size="xl"
                        startDecorator={<ImageTwoToneIcon />}
                        sx={{
                          backgroundColor: 'neutral.500',
                          // bgcolor: 'background.componentBg',
                          width: '100%',
                          height: '100%',
                        }}
                        style={isDragging ? { backgroundColor: "blue" } : undefined}
                        {...dragProps}
                      >Click or Drag/Drop here
                      </Button>
                    </Box>
                    {/* //& Image List to Add to database */}
                    <Box
                      sx={{
                        borderRadius: '10px',
                        display: 'flex-column',
                        bgcolor: 'background.componentBg',
                        maxHeight: 'calc(100vh - 410px)',
                      }}>
                      {/* //^ Buttons Box */}
                      <Box
                        sx={{ m: 2 }}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-around"
                      >

                        <Button
                          onClick={() => handleImageAddAll(imageList, onImageRemoveAll)}
                          startDecorator={<KeyboardDoubleArrowLeftIcon />}
                          disabled={imageList.length <= 0}
                        >Add All </Button>
                        <Button
                          startDecorator={<DeleteIcon />}
                          onClick={onImageRemoveAll}
                          disabled={imageList.length <= 0}
                        >Remove All </Button>
                      </Box>
                      <Sheet
                        sx={{
                          width: '100%',
                          height: '87%',
                          maxHeight: '100%',
                          bgcolor: 'background.componentBg',
                          overflowY: 'auto',
                          borderRadius: '10px',

                        }}
                      >
                        {/* //^ Image List */}
                        <Box
                          sx={{
                            m: 2,
                            height: '80%',
                          }}
                          display="grid"
                          gridTemplateColumns='1fr 1fr'
                        >
                          {imageList.map((image, index) => (
                            <Card key={index}
                              sx={{
                                m: 1,
                                flexGrow: 1,
                                minWidth: '100px',
                                minHeight: '150px',
                                maxHeight: '150px',
                                backgroundColor: 'grey.300',
                              }} >


                              <CardCover
                                onClick={(e) => (handleClickEvent(e, index, onImageUpdate, onImageRemove))}
                                sx={{ cursor: 'pointer' }}
                              >

                                <img src={image.data_url} alt="" style={{ borderRadius: '10px' }} />
                              </CardCover>


                            </Card>
                          ))}

                        </Box>
                      </Sheet>



                    </Box>
                  </Fragment>
                )}
              </ImageUploading>
            </Box>
          </Box>
        </Sheet>
      </Box>

      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={"Image Details"} titleColor={"purple"} pageWidth={'sm'} >
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

      </Menu>

    </Box>
  )
}
