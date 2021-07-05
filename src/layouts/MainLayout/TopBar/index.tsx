import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'src/components/Logo';
import NAMES from 'src/routes/names';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    justifyContent: 'center',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopBar: React.FC<any> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to={NAMES.HOME}>
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
