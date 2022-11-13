/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-11 14:47:32
 * @modify date 2022-06-11 14:47:32
 * @desc Component wrapper around the Mui DatePicker component.
 *         Provides a the auto-inclusion of Localization and the ability to
 *         convert the date value to the default event parameter.
 * @param {object} props
 * @param {string} props.name    - field name     default: 'sampleDate'
 * @param {string} props.label   - field label    default: 'Date'
 * @param {string} props.value   - field value    REQUIRED
 * @param {string} props.error   - field error    default: null
 * @param {string} props.variant - field variant  default: 'inline'
 * @param {string} props.inputVariant - field input variant  default: 'outlined'
 * @param {function} props.onChange - callback function when color changes (REQUIRED)
 * 
 */

// #region [imports]
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { TextField } from '@mui/joy';
import { LocalizationProvider, DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
// #endregion

// *** Main Component ***
export default function DatePicker(props) {
    const { name, label, value, error = null, onChange, variant, inputVariant, ...others } = props;

    return (
        <LocalizationProvider dateAdapter={DateFnsUtils}
        >
            <MuiDatePicker
                // disableToolbar 
                variant={variant || "inline"}
                inputVariant={inputVariant || "outlined"}
                label={label || 'Date'}
                format="mm/dd/yyyy"
                name={name || 'sampleDate'}
                value={value}
                onChange={(newValue) => onChange(newValue)}
                {...(error && { error: true, helperText: error })}
                renderInput = {(params) => <TextField {...params} />}
                {...others}
            />
        </LocalizationProvider >
    )
}