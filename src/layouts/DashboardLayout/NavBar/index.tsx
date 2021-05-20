/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useEffect } from 'react';
import {
  Book as BookIcon,
  PenTool as PenToolIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
} from 'react-feather';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NAMES from 'src/routes/names';
import NavItem from './NavItem';

// TODO: criar um useUserInfo hook para prover os dados do usuário.
// Tomando cuidado para não prover dados importantes.
const user = {
  avatar:
    'https://avatars.githubusercontent.com/u/1212015?s=400&u=886cb9225f7bce0e75a240523834326ebdfeb49a&v=4',
  jobTitle: 'Desenvolvedor Pleno',
  name: 'Ericson Moreira',
};

const items = [
  {
    href: NAMES.TURMAS,
    icon: BookIcon,
    title: 'Minhas Turmas',
  },
  {
    href: NAMES.OFERTAS,
    icon: ShoppingBagIcon,
    title: 'Ofertas',
  },
  {
    href: NAMES.SETTINGS,
    icon: SettingsIcon,
    title: 'Settings',
  },
  {
    href: NAMES.TYPOGRAPHY,
    icon: PenToolIcon,
    title: 'Typography',
  },
];

const useStyles = makeStyles(() => ({
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
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }: any) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
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
