import { TextField, TextFieldProps } from '@material-ui/core';

import { useController } from 'react-hook-form';

type GenericInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
};

const GenericInput: React.FC<GenericInputProps & TextFieldProps> = (props) => {
  const { name, control, ...rest } = props;

  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  });
  return <TextField {...inputProps} inputRef={ref} {...rest} />;
};

export default GenericInput;
