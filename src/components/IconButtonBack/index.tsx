import { IconButton, IconButtonProps } from '@material-ui/core';
import { ArrowLeft as ArrowLeftIcon } from 'react-feather';
import { useHistory } from 'react-router';

const IconButtonBack: React.FC<IconButtonProps> = (props) => {
  const history = useHistory();

  return (
    <IconButton {...props} onClick={() => history.go(-1)}>
      <ArrowLeftIcon size={16} />
    </IconButton>
  );
};

export default IconButtonBack;
