import React from 'react';
import { FormControl, FormHelperText, InputLabel, Option, Select as JoySelect } from '@mui/joy'


const Select = (props) => {
    const { name, label, value, error = null, onChange, options } = props

    return (
        <FormControl variant='outlined' fullWidth
            {...(error && { error: true })}
        >
            <InputLabel>{label || 'Select Label'}</InputLabel>
            <JoySelect
                variant="filled"
                label={label || 'select label'}
                name={name}
                value={value || ''}
                onChange={onChange}
                fullWidth
            >
                <MenuItem key='999' value="None">None</MenuItem>
                {options &&
                    options.map(
                        item => (<Option key={item.id} value={item.id}>{item.title}</Option>)
                    )
                }
            </JoySelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select