import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import spacing from './spacing';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#333333',
    },
    background: {
      default: '#FAFAFA',
      paper: colors.common.white,
    },
    primary: {
      contrastText: '#ffffff',
      light: '#D1DEFF',
      main: '#5EA5E4',
      dark: '#092053',
    },
    secondary: {
      main: '#FF5348',
    },
    error: {
      main: '#AB122E',
    },
    success: {
      main: '#F49869',
    },
    warning: {
      main: '#F5AF58',
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
    },
  },
  shadows,
  typography,
  spacing,
});

export default theme;
