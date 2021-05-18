import clsx from 'clsx';
import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core';
// import Logo from 'src/components/Logo';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
    justifyContent: 'center',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopBar: React.FC<any> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h2">Sagu</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
