import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center'
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  padding_8_16: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  padding_12_16: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  wh24: {
    width: 24,
    height: 24
  },
  paddingTop8: {
    paddingTop: 8
  },
  paddingBottom8: {
    paddingBottom: 8
  },
  marginTop8: {
    marginTop: 8,
  },
  marginBottom8: {
    marginBottom: 8,
  },
  marginRight8: {
    marginRight: 8,
  },
  marginLeft8: {
    marginLeft: 8,
  },
  fit: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
