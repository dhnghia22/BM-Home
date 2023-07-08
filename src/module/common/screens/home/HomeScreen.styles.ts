import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from 'react-native'

type Style = {
  container: ViewStyle
}

export default (theme: string) => {
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
    }
  });
}

