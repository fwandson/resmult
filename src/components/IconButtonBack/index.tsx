import { IconButton, IconButtonProps } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';

const IconButtonBack: React.FC<IconButtonProps> = (props) => {
  const history = useHistory();

  return (
    <IconButton {...props} onClick={() => history.go(-1)}>
      <ArrowBackIcon fontSize="small" />
    </IconButton>
  );
};

export default IconButtonBack;
