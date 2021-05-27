import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import ptBRLocale from "date-fns/locale/pt-BR";
import GlobalStyles from "src/components/GlobalStyles";
import CustonToastContainer from "src/config/CustonToastContainer";
import { LoadingProvider } from "src/context/LoadingContext";
import theme from "src/theme";
import sbTheme from "./sbTheme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: sbTheme,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
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
