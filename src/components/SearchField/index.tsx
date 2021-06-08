import { TextField, InputAdornment, TextFieldProps } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      label="Buscar"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
