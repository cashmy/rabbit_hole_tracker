import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
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
  });

  export default theme;