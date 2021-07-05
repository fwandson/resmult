import { InputBaseComponentProps, TextFieldProps } from '@material-ui/core';
import { ElementType } from 'react';
import GenericInput, {
  GenericInputProps,
} from 'src/components/inputs/GenericInput';
import TextMaskNota from 'src/components/masks/TextMaskNota';

const InputNota: React.FC<GenericInputProps & TextFieldProps> = (props) => {
  const { InputProps, ...rest } = props;

  return (
    <GenericInput
      {...rest}
      InputProps={{
        ...InputProps,
        inputComponent: TextMaskNota as ElementType<InputBaseComponentProps>,
      }}
    />
  );
};

export default InputNota;
