import { ThemeProvider } from '@material-ui/styles';
import 'fontsource-roboto';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import Routes from 'src/routes';
import theme from 'src/theme';
import GlobalStyles from './components/GlobalStyles';
import CustonToastContainer from './config/CustonToastContainer';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CustonToastContainer />
      <BrowserRouter>
        <LoadingProvider>
          <AuthProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Routes />
            </MuiPickersUtilsProvider>
          </AuthProvider>
        </LoadingProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
