import { deepmerge } from '@mui/utils';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import colors from '@mui/joy/colors';
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
  useColorScheme,
} from '@mui/joy/styles';

const muiTheme = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using `CssVarsProvider` from Joy UI.
  cssVarPrefix: 'joy',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.blue[500],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

const joyTheme = extendJoyTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-neutral-100)',
          componentBg: 'var(--joy-palette-common-white)'
        }
      }
    },
    dark: {
      palette: {
        background: {
          body: 'var(--joy-palette-common-black)',
          componentBg: 'var(--joy-palette-neutral-900)'
        }
      }
    }
  },
  // Components: Avatar Sizes
  components: {
    JoyAvatar: {
      styleOverrides: {
        root: ({ownerState, theme}) => ({
          ...(ownerState.size === 'xs' && {
            '--Avatar-size': '1.5rem',
            width: 'var(--Avatar-minHeight, 1.5rem)',
            height: 'var(--Avatar-minHeight, 1.5rem)',
            fontSize: theme.vars.fontSize.xs,
          }),
          ...(ownerState.size === 'xl' && {
            '--Avatar-size': '3.5rem',
            width: 'var(--Avatar-minHeight, 3.5rem)',
            height: 'var(--Avatar-minHeight, 3.5rem)',
            fontSize: theme.vars.fontSize.xl,
          }),
          ...(ownerState.size === 'xxl' && {
            '--Avatar-size': '4rem',
            width: 'var(--Avatar-minHeight, 4rem)',
            height: 'var(--Avatar-minHeight, 4rem)',
            fontSize: theme.vars.fontSize.xxl,
          }),
        })

      }
    }
  }
});

const theme = deepmerge(muiTheme, joyTheme);

export default theme;