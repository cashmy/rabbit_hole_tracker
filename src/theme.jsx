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
          white: '#ffffff',
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
          primary: colors.grey[200],
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
  // Components
  components: {
    // Avatar Sizes
    JoyAvatar: {
      styleOverrides: {
        root: ({ownerState, theme}) => ({
          ...(ownerState.size === 'xs' && {
            '--Avatar-size': '1.5rem',
            width: 'var(--Avatar-minWidth, 1.5rem)',
            height: 'var(--Avatar-minHeight, 1.5rem)',
            fontSize: theme.vars.fontSize.xs,
          }),
          ...(ownerState.size === 'xl' && {
            '--Avatar-size': '3.5rem',
            width: 'var(--Avatar-minWidth, 3.5rem)',
            height: 'var(--Avatar-minHeight, 3.5rem)',
            fontSize: theme.vars.fontSize.xl,
          }),
          ...(ownerState.size === 'xxl' && {
            '--Avatar-size': '4rem',
            width: 'var(--Avatar-minWidth, 4rem)',
            height: 'var(--Avatar-minHeight, 4rem)',
            fontSize: theme.vars.fontSize.xxl,
          }),
        })

      }
    },
    // Button Sizes
    JoyButton:{
      styleOverrides: {
        root: ({ownerState, theme}) => ({
          ...(ownerState.size === 'xs' && {
            '--Icon-fontSize': '1rem',
            '--Button-gap': '0.25rem',
            minHeight: 'var(--Button-minHeight, 1.75rem)',
            fontSize: theme.vars.fontSize.xs,
            paddingBlock: '2px',
            paddingInline: '0.5rem'
          }),
          ...(ownerState.size === 'xl' && {
            '--Icon-fontSize': '2rem',
            '--Button-gap': '1rem',
            minHeight: 'var(--Button-minHeight, 4rem)',
            fontSize: theme.vars.fontSize.xl,
            paddingBlock: '0.5rem',
            paddingInline: '2rem',
          }),
          ...(ownerState.size === 'xxl' && {
            '--Icon-fontSize': '3rem',
            '--Button-gap': '1.5rem',
            minHeight: 'var(--Button-minHeight, 4.5rem)',
            fontSize: theme.vars.fontSize.xl,
            paddingBlock: '0.75rem',
            paddingInline: '2.5rem',
          }),
        })  
      }
    }
  }
});

const theme = deepmerge(muiTheme, joyTheme);

export default theme;