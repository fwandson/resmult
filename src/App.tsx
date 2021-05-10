import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import "fontsource-roboto";
import { useRoutes } from "react-router";
import theme from "src/theme";
import GlobalStyles from "./components/GlobalStyles";
import routes from "./routes";

function App() {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
}

export default App;
