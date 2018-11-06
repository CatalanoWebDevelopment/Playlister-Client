import { createMuiTheme } from "@material-ui/core/styles";
import Colors from "./Colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary
    },
    secondary: {
      main: Colors.secondary,
      dark: Colors.tertiary
    }
  }
});

export default theme;
