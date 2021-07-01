import { InputBaseComponentProps, TextFieldProps } from '@material-ui/core';
import { ElementType } from 'react';
import GenericInput, {
  GenericInputProps,
} from 'src/components/inputs/GenericInput';
import TextMaskCPF from 'src/components/masks/TextMaskCPF';

const InputCPF: React.FC<GenericInputProps & TextFieldProps> = (props) => {
  const { InputProps, ...rest } = props;

  return (
    <GenericInput
      {...rest}
      InputProps={{
        ...InputProps,
        inputComponent: TextMaskCPF as ElementType<InputBaseComponentProps>,
      }}
    />
  );
};

export default InputCPF;
