import { TextFieldProps } from '@material-ui/core';
import GenericInput, {
  GenericInputProps,
} from 'src/components/inputs/GenericInput';
import TextMaskCPF from 'src/components/masks/TextMaskCPF';

const InputCPF: React.FC<GenericInputProps & TextFieldProps> = (props) => {
  return (
    <GenericInput
      InputProps={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inputComponent: TextMaskCPF as any,
      }}
      {...props}
    />
  );
};

export default InputCPF;
