import React from 'react';
import theme from '../../theme';
import { Button as JoyButton } from '@mui/joy';

const Button = (props) => {
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