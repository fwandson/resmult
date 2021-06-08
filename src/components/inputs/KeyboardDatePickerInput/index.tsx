import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';
import { useController } from 'react-hook-form';

export type KeyboardDatePickerInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
};

const KeyboardDatePickerInput: React.FC<
  KeyboardDatePickerInputProps & KeyboardDatePickerProps
> = (props) => {
  const { control, name, ...rest } = props;

  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <KeyboardDatePicker
      {...inputProps}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
};

export default KeyboardDatePickerInput;
