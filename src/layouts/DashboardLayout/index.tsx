import { Hidden, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import IconButtonBack from 'src/components/IconButtonBack';
import NavBar from './NavBar';
import NavBottomBar from './NavBottomBar';
import TopBar from './TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(10),
    },
  },
}));

const DashboardLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <IconButtonBack />
            {children}
          </div>
        </div>
      </div>
      <Hidden mdUp>
        <NavBottomBar />
      </Hidden>
    </div>
  );
};

export default DashboardLayout;
