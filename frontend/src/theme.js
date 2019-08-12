import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#4fa444',
    },
    secondary: {
      main: '#79a900',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#000',
    },
  },
});

export default theme;
