import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomInputTextProps extends TextInputProps {
  style?: any;
  fontSize?: number;
  fontFamily?: string;
}

const CustomInputText: React.FC<CustomInputTextProps> = ({
  style,
  fontSize,
  fontFamily,
  ...rest
}) => {
  const inputStyle = [
    styles.input,
    style,
    fontSize && { fontSize },
    fontFamily && { fontFamily },
  ];

  return <TextInput style={inputStyle} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default CustomInputText;
