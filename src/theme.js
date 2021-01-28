import color from './color';

export const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: color.primary
    }
  },
});