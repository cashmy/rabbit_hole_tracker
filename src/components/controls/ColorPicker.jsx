/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-11 14:11:24
 * @modify date 2022-06-11 14:11:24
 * @desc   Custom component with a Text field and popup Colorpicker
 *         Allows use of the color picker in a styled modal/dialog.
 *         Uses two(2) helper functions, one(1) hook, and one (1) callback function.
 *           - Uses the getContrastText helper function to get the contrast color of the background color.
 *           - Uses the useClickOutside helper function to handle the click outside of the modal/dialog.
 *           - Uses the useRef hook to handle the click outside of the modal/dialog.
 *           - Uses the useCallback function to handle change and pass value to parent.
 * @param {object} props
 * @param {string} props.name    - field name     default: 'cpkColor'
 * @param {string} props.label   - field label    default: 'Color'
 * @param {string} props.value   - field value    REQUIRED
 * @param {string} props.error   - field error    default: null
 * @param {string} props.variant - field variant  default: 'filled'
 * @param {function} props.onChange - callback function when color changes (REQUIRED)
 */

// #region [imports]
import React, { Fragment, useState, useRef, useCallback } from 'react';
import { IconButton, InputAdornment, TextField, } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import useClickOutside from "../../helpers/useClickOutside";
import TextContrast from '../../helpers/getTextContrast';
import { HexColorPicker } from 'react-colorful';
//#endregion

// *** Main Component ***
const ClrPicker = (props) => {
    const { name, label, value, error = null, variant, onChange, ...other } = props;
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    // * Event Handlers
    const handleClose = useCallback(() => toggle(false), []);
    useClickOutside(popover, handleClose);
    const handleChangeProp = (color, event) => {
        let tempProp = {
            name: name,
            value: color
        }
        event = { ...event, target: tempProp }
        props.onChange(event)
    }

    return (
        <Fragment>
            <TextField
                variant={variant || "filled"}
                size="small"
                label={label || 'Color'}
                name={name || 'cpkColor'}
                value={value}
                onChange={onChange}
                {...(error && { error: true, helperText: error })}
                {...other}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => toggle(true)}
                                style={{ backgroundColor: value, color: TextContrast.getTextContrast(value) }}
                            >
                                {isOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <div>
                {isOpen && (
                    <div ref={popover} >
                        <HexColorPicker color={value} onChange={handleChangeProp} />
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default ClrPicker;