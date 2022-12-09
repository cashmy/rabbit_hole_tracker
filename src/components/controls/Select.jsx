import React, {useRef} from 'react';
import { Option, Select as JoySelect } from '@mui/joy'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

const Select = (props) => {
    const { name, label, value, defaultValue, error = null, onChange, placeholder, size, variant, options } = props

    return (
        <FormControl variant='outlined' 
            {...(error && { error: true })}
        >
            <FormLabel sx={{fontSize:'xs', mt:1}}> {label || 'Select Label'}</FormLabel>
            <JoySelect
                defaultValue={defaultValue || ''}
                variant={variant || 'soft'}
                size={size || 'sm'}
                action={useRef(null)}
                label={label || 'select label'}
                name={name}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder || 'Choose one...'}
            >
                {/* <MenuItem key='999' value="None">None</MenuItem> */}
                {options &&
                    options.map(
                        (item, index) => (<Option key={index} value={item.id}>{item.title}</Option>)
                    )
                }
            </JoySelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select