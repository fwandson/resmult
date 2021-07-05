/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppBar,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'src/components/Logo';
import NAMES from 'src/routes/names';
import { LeftArea, RightArea } from './sytles';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

// TODO: ajustar os props desse component
const TopBar = ({ className, onMobileNavOpen, ...rest }: any) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <LeftArea>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </LeftArea>
        <RouterLink to={NAMES.HOME}>
          <Logo />
        </RouterLink>
        <RightArea />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
