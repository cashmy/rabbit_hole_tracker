import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/joy/FormControl'
import FormHelperText from '@mui/joy/FormHelperText'
import FormLabel from '@mui/joy/FormLabel'

const TextareaAuto = (props) => {
  const { name, label, value, error = null, size, variant, onChange, ...other } = props;

  return (
    <FormControl
      {...(error && { error: true })}
    >
      <FormLabel>{label || "label"}</FormLabel>
      <Textarea
        variant={variant || "soft"}
        size={size || "sm"}
        placeholder={label || "label"}
        name={name || "name"}
        aria-label={name || "name"}
        value={value}
        onChange={onChange}
        {...other}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl >
  );
};

export default TextareaAuto;
