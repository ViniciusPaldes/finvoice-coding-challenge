import color from './color';

export const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiAppBar: {
        // Name of the rule
        colorPrimary: color.primary
      },
    },
  });