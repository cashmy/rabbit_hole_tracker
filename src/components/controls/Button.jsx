import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button as JoyButton } from '@mui/joy';

const Button = (props) => {
    const theme = useTheme();
    const { text, size, color, variant, onClick, ...other } = props

    const defaultClickHandler = () => {
        alert("Button Clicked")
    }

    return (
        <JoyButton
            variant={variant || "solid"}
            color={color || "neutral"}
            sx={{ textTransform: "none", margin: theme.spacing(0.5) }}
            size={size || "sm"}
            onClick={onClick || defaultClickHandler}
            {...other}
        >
            {text || "Button"}
        </JoyButton>
    )
}

export default Button