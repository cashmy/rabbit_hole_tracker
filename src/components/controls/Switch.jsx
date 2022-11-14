import React from 'react';
import { Tooltip, Switch as JoySwitch } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';


const Switch = (props) => {
    const { name, label, value, error = null, onChange, ...others} = props

    return (
        <Tooltip title={`Toggle ${label || 'switch'} status`}>
            <FormControl variant='outlined' fullWidth
                {...(error && { error: true })}
            >
                <FormLabel
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

export default Switch;