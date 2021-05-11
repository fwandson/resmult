import { TextField, TextFieldProps } from '@material-ui/core';
import { useController } from 'react-hook-form';

export type GenericInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
};

const GenericInput: React.FC<GenericInputProps & TextFieldProps> = (props) => {
  const { name, control, ...rest } = props;

  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
};

export default GenericInput;
