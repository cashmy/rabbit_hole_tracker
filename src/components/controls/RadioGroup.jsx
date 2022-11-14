import React from 'react';
import {Radio, RadioGroup as JoyRadioGroup } from '@mui/joy';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import FormControl  from '@mui/joy/FormControl'

export default function RadioGroup(props) {

  const { name, label, value, error = null, onChange, color, items } = props;

  return (
    <FormControl
      {...(error && { error: true })}
    >
      <FormLabel>{label}</FormLabel>
      <JoyRadioGroup 
        row
        name={name}
        value={value}
        onChange={onChange}
      >
        {
          items.map(
            (item) => (
              <Radio key={item.id} value={item.id} color={color || 'primary'} label={item.title} />
            )
          )
        }
      </JoyRadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}