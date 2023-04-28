/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ListItem, makeStyles } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { NavLink as RouterLink } from 'react-router-dom';

const CustonListItem = styled(ListItem)({
  display: 'flex',
  paddingTop: 0,
  paddingBottom: 0,
});

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: 'auto',
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: 700,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const NavItem = ({ className, href, icon: Icon, title, ...rest }: any) => {
  const classes = useStyles();

  return (
    <CustonListItem className={className} disableGutters {...rest}>
      <Button activeClassName={classes.active} component={RouterLink} to={href}>
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </CustonListItem>
  );
};

export default NavItem;
