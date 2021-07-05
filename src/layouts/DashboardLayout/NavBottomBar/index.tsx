import { BottomNavigationAction } from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import { findIndex } from 'lodash';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import NAMES from 'src/routes/names';
import { BottomNavigation } from './styles';

const items = [
  {
    href: NAMES.OFERTAS,
    icon: <ClassIcon />,
    title: 'Ofertas',
  },
  {
    href: NAMES.TURMAS,
    icon: <GroupIcon />,
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
