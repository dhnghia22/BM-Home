export interface ColorPalette {
  primary: string;
  white: string;
  black: string;
  transparent: string;
  gray950: string;
  gray800: string;
  gray600: string;
  gray500: string;
  gray100: string;
  gray400: string;
  gray900: string;
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
    gray950: '#141619',
    gray800: '#2B343D',
    gray600: '#646D7A',
    gray500: '#7F8893',
    gray100: '#F5F7FA',
    gray400: '#ADB5C3',
    gray900: '#21272F',
    background: '#FFFFFF',
  },
  dark: {
    primary: '#3AC5C9',
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'rgba(0, 0, 0, 0)',
    gray950: '#141619',
    gray800: '#2B343D',
    gray600: '#646D7A',
    gray500: '#7F8893',
    gray400: '#ADB5C3',
    gray100: '#F5F7FA',
    gray900: '#21272F',
    background: '#FFFFFF',
  },
};
