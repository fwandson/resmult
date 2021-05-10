import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import 'fontsource-roboto';
import theme from 'src/theme';
import GlobalStyles from './components/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Typography>Ola mundo</Typography>
      <Typography variant="h1">Teste</Typography>
    </ThemeProvider>
  );
}

export default App;
