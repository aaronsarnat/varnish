import { color } from './colors';

export const palette = {
    common:{
        black: color.black,
        white: color.white,
        transparent: color.transparent
    },
    background: {
        light: color.N2,
        dark: color.B9,
        error: color.R2,
        info: color.B2,
        success: color.G2,
        warning: color.O2
    },
    border: {
        dark: color.N7,
        main: color.N4,
        error: color.R4,
        info: color.B4,
        success: color.G4,
        warning: color.O4
    },
    primary: {
        light: color.B5,
        main: color.B6,
        dark: color.B7,
        veryDark: color.B8
    },
    secondary: {
        light: color.O5,
        main: color.O6
    },
    text: {
        primary: color.N9,
        secondary: color.N7,
        error: color.R6,
        info: color.B6,
        success: color.G6,
        warning: color.O6,
        contrast: color.N1
    }
};
