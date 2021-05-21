/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar,
  // Badge,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import { useAuth } from 'src/context/AuthContext';
import NAMES from 'src/routes/names';
import { LeftArea, RightArea } from './sytles';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }: any) => {
  const classes = useStyles();

  const history = useHistory();

  // const [notifications] = useState([]);

  const { signOut } = useAuth();

  const handlerLogout = useCallback(() => {
    signOut();
    history.push(NAMES.LOGIN);
  }, []);

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
        <RightArea>
          <Hidden mdDown>
            {/* TODO: ver com o Matheurs se isso vai ficar aqui mesmo */}
            {/* <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton color="inherit" onClick={() => handlerLogout()}>
              <InputIcon />
            </IconButton>
          </Hidden>
        </RightArea>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
