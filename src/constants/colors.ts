export interface ColorPalette {
  primary: string;
  white: string;
  black: string;
  transparent: string;
  gray100: string;
  gray200: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray800: string;
  gray900: string;
  gray950: string;
  orange900: string;
  background: string;
}

interface Colors {
  light: ColorPalette;
  dark: ColorPalette;
}

export const Colors: Colors = {
  light: {
    primary: '#3AC5C9',
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'rgba(0, 0, 0, 0)',
    gray100: '#F5F7FA',
    gray200: '#EBF0F5',
    gray400: '#ADB5C3',
    gray500: '#7F8893',
    gray600: '#646D7A',
    gray800: '#2B343D',
    gray900: '#21272F',
    gray950: '#141619',
    orange900: '#FF7926',
    background: '#FFFFFF',
  },
  dark: {
    primary: '#21272F',
    white: '#FFFFFF',
    black: '#FFFFFF',
    transparent: 'rgba(0, 0, 0, 0)',
    gray100: '#FFFFFF',
    gray200: '#FFFFFF',
    gray400: '#FFFFFF',
    gray500: '#FFFFFF',
    gray600: '#FFFFFF',
    gray800: '#FFFFFF',
    gray900: '#FFFFFF',
    gray950: '#FFFFFF',
    orange900: '#FF7926',
    background: '#21272F',
  },
};
