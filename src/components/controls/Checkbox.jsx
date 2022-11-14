// import React from 'react';
import { Checkbox as JoyCheckBox } from '@mui/joy'
import FormControl  from '@mui/joy/FormControl'
import FormHelperText  from '@mui/joy/FormHelperText'
import FormLabel  from '@mui/joy/FormLabel'

const CheckBox = (props) => {
    const { name, label, value, error = null, onChange, labelPlacement, color, ...options } = props

    let checkedValue = false
    let defaultValues = { name: "checkbox", value: checkedValue }

    return (
        <FormControl variant='outlined' fullWidth
            {...(error && { error: true })}
        >
            <FormLabel
                labelPlacement={labelPlacement || "end"}
                control={
                    <JoyCheckBox
                        name={name || defaultValues.name}
                        color={color || "primary"}
                        checked={value || defaultValues.value}
                        onChange={onChange}
                        // label={label || "checkbox name"}
                        {...options}
                    />}
                label={label || "checkbox name"}
            ></FormLabel>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default CheckBox