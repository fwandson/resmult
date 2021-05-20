import { BottomNavigationAction } from '@material-ui/core';
import { findIndex } from 'lodash';
import { useCallback } from 'react';
import {
  Book as BookIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
} from 'react-feather';
import { useHistory, useLocation } from 'react-router';
import NAMES from 'src/routes/names';
import { BottomNavigation } from './styles';

const items = [
  {
    href: NAMES.OFERTAS,
    icon: <ShoppingBagIcon />,
    title: 'Ofertas',
  },
  {
    href: NAMES.TURMAS,
    icon: <BookIcon />,
    title: 'Turmas',
  },
  {
    href: NAMES.SETTINGS,
    icon: <SettingsIcon />,
    title: 'Settings',
  },
];

const NavBottomBar: React.FC = () => {
  const history = useHistory();

  const { pathname } = useLocation();

  const getCurrentValue = useCallback(() => {
    return findIndex(items, (item) => pathname.includes(item.href));
  }, [pathname]);

  return (
    <BottomNavigation value={getCurrentValue()} showLabels>
      {items.map((item) => (
        <BottomNavigationAction
          key={item.title}
          label={item.title}
          icon={item.icon}
          onClick={() => history.push(item.href)}
        />
      ))}
    </BottomNavigation>
  );
};

export default NavBottomBar;
