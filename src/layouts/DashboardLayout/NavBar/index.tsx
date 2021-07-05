/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import { useCallback, useEffect } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import useUserInfo from 'src/hooks/useUserInfo';
import NAMES from 'src/routes/names';
import NavItem from './NavItem';

const items = [
  {
    href: NAMES.TURMAS,
    icon: GroupIcon,
    title: 'Minhas Turmas',
  },
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 40,
    height: 40,
    marginBottom: theme.spacing(2),
  },
}));

const NavBar = ({ onMobileClose, openMobile }: any) => {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const { signOut } = useAuth();

  const userInfo = useUserInfo();

  const handleLogout = useCallback(() => {
    signOut();
    history.push(NAMES.LOGIN);
  }, []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={`http://localhost:81/miolo20/html/index.php?module=basic&action=main:getfile&&fileId=${userInfo.personid}`}
          to={NAMES.HOME}
        >
          {userInfo.nome[0]}
        </Avatar>
        <Typography color="textPrimary" variant="h6">
          {userInfo.nome}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box p={2}>
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          endIcon={<ExitToAppIcon />}
          onClick={() => handleLogout()}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
