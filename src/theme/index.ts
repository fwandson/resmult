import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white,
    },
    primary: {
      contrastText: '#ffffff',
      main: '#5EA5E4',
    },
    secondary: {
      contrastText: '#000',
      main: '#fff',
    },
    text: {
      primary: '#172b4d',
      secondary: '#FFF',
    },
  },
  shadows,
  typography,
});

export default theme;
