// import React from 'react';
import { Checkbox as JoyCheckBox } from '@mui/joy'
import FormControl from '@mui/joy/FormControl'
import FormHelperText from '@mui/joy/FormHelperText'
import FormLabel from '@mui/joy/FormLabel'

const CheckBox = (props) => {
    const { name, label, value, error = null, onChange, size, color, variant, ...options } = props

    let checkedValue = false
    let defaultValues = { name: "checkbox", value: checkedValue }

    return (
        <JoyCheckBox
            size={size || "sm"}
            variant={variant || "solid"}
            name={name || defaultValues.name}
            color={color || "primary"}
            checked={value || defaultValues.value}
            onChange={onChange}
            label={label || "checkbox name"}
            {...options}
        />
    )
}

export default CheckBox