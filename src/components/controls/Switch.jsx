import React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Tooltip,
    Switch as JoySwitch
} from '@mui/joy'


const Switch = (props) => {
    const { name, label, value, error = null, onChange, ...others} = props

    return (
        <Tooltip title={`Toggle ${label || 'switch'} status`}>
            <FormControl variant='outlined' fullWidth
                {...(error && { error: true })}
            >
                <FormControlLabel
                    control={
                        <JoySwitch
                            aria-label={`Toggle ${label || 'switch'} status`}
                            checked={value == null ? !!value : value }
                            onChange={onChange}
                            name={name}
                            {...others}
                        />
                    }
                    label={label || 'Switch'}
                />
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </Tooltip>
    )
}



export default Switch