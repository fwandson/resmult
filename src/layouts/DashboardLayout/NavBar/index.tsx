/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Book as BookIcon,
} from 'react-feather';
import NavItem from './NavItem';
import NAMES from 'src/routes/names';

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
    href: NAMES.DASHBOARD,
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: NAMES.TURMAS,
    icon: BookIcon,
    title: 'Minhas Turmas',
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers',
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Products',
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
  },
  {
    href: NAMES.SETTINGS,
    icon: SettingsIcon,
    title: 'Settings',
  },
  {
    href: NAMES.LOGIN,
    icon: LockIcon,
    title: 'Login',
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register',
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error',
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
