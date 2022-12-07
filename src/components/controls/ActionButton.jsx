import React from 'react';
import { IconButton, Tooltip } from '@mui/joy';
import theme from '../../theme'

export default function ActionButton(props) {
    const { color, children, onClick, tooltipText, variant, size, placement, ...other } = props;

    return (
        <>
            {tooltipText &&
                <Tooltip title={tooltipText} placement={placement || "bottom"}>
                    <IconButton
                        variant={variant || 'plain'}
                        size={size || 'sm'}
                        color={color || 'neutral'}
                        sx={{ minWidth: 0, margin: theme.spacing(0.5) }}
                        onClick={onClick}
                        {...other}
                    >
                        {children}
                    </IconButton >
                </Tooltip>
            }
            {!tooltipText &&
                <IconButton
                    variant={variant || 'plain'}
                    size={size || 'sm'}
                    color={color || 'neutral'}
                    sx={{ minWidth: 0, margin: theme.spacing(0.5) }}
                    style={{ color: color }}
                    onClick={onClick}
                    {...other}
                >
                    {children}
                </IconButton >
            }
        </>
    )
}