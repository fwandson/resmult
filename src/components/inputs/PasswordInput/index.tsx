import { TextFieldProps, InputAdornment, IconButton } from '@material-ui/core';
import GenericInput, { GenericInputProps } from '../GenericInput';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';

const PasswordInput: React.FC<GenericInputProps & TextFieldProps> = (props) => {
  const { InputProps, ...rest } = props;

  const [visible, setVisible] = useState(false);

  return (
    <GenericInput
      {...rest}
      type={visible ? 'text' : 'password'}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setVisible((old) => !old)}>
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
