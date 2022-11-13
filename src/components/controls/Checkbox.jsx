// import React from 'react';
import { FormControl, FormControlLabel, FormHelperText, Checkbox as JoyCheckBox } from '@mui/joy'

const CheckBox = (props) => {
    const { name, label, value, error = null, onChange, labelPlacement, color, ...options } = props

    let checkedValue = false
    let defaultValues = { name: "checkbox", value: checkedValue }

    return (
        <FormControl variant='outlined' fullWidth
            {...(error && { error: true })}
        >
            <FormControlLabel
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
            ></FormControlLabel>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default CheckBox