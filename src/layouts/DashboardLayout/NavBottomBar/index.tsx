import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import {
  BarChart as BarChartIcon,
  Book as BookIcon,
  Settings as SettingsIcon,
} from 'react-feather';
import { useHistory } from 'react-router';
import NAMES from 'src/routes/names';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

const items = [
  {
    href: NAMES.DASHBOARD,
    icon: <BarChartIcon />,
    title: 'Dashboard',
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
  const classes = useStyles();

  const history = useHistory();

  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
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
