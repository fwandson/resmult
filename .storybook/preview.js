import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import ptBRLocale from 'date-fns/locale/pt-BR';
import GlobalStyles from 'src/components/GlobalStyles';
import CustonToastContainer from 'src/config/CustonToastContainer';
import { LoadingProvider } from 'src/context/LoadingContext';
import theme from 'src/theme';
import sbTheme from './sbTheme';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
  xsMUI: {
    name: 'XS Material UI',
    styles: {
      width: '600px',
      height: '100%',
    },
  },
  smMUI: {
    name: 'SM Material UI',
    styles: {
      width: '960px',
      height: '100%',
    },
  },
  mdMUI: {
    name: 'MD Material UI',
    styles: {
      width: '1280px',
      height: '100%',
    },
  },
  lgMUI: {
    name: 'LG Material UI',
    styles: {
      width: '1920px',
      height: '100%',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: sbTheme,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: { ...MINIMAL_VIEWPORTS, ...customViewports },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CustonToastContainer />
      <LoadingProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
          <Story />
        </MuiPickersUtilsProvider>
      </LoadingProvider>
    </ThemeProvider>
  ),
];
