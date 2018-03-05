import { createMuiTheme } from 'material-ui/styles';

const themes = [
  {
    id: 'light',
    source: createMuiTheme({
      palette: {
        type: 'light',
      }
    })
  },
  {
    id: 'dark',
    source: createMuiTheme({
      palette: {
        type: 'dark',
      }
    })
  }
];

export const defaultTheme = themes[0];

export default themes;
