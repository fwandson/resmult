import { Dialog, DialogProps, useMediaQuery } from '@material-ui/core';
import theme from 'src/theme';

const CustonDialog: React.FC<DialogProps> = (props) => {
  const { children, ...rest } = props;

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog {...rest} fullWidth fullScreen={fullScreen}>
      {children}
    </Dialog>
  );
};

export default CustonDialog;
