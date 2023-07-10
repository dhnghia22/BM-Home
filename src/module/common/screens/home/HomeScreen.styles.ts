import { ColorPalette } from '@/constants/colors'
import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from 'react-native'

export default (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    headerSearch: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    },
    loadmore: { width: '100%', height: 40, justifyContent: 'center' }
  })
}
