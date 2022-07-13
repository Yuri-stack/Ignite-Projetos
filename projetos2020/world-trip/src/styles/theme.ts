import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        highlight: {
            "50": "#FFBA0850",
            "100": "#FFBA08"
        },
        dark: {
            "text": "#47585B",
            "info": "#999999",
            "info-50": "#99999950"
        }
    },
    breakpoints: {
        sm: '3750px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
    },
    styles: {
        global: {
            body: {
                bg: '#DADADA',
                color: 'dark.text'
            }
        }
    }
})

