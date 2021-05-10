import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import 'fontsource-roboto';
import theme from 'src/theme';
import GlobalStyles from './components/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Typography>APP</Typography>
      <Typography variant="caption">Testando</Typography>
    </ThemeProvider>
  );
}

export default App;
