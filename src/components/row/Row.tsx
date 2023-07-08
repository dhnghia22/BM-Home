import React from 'react'
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native'

interface RowViewProps {
  style?: StyleProp<ViewStyle>
}

const Row: React.FC<RowViewProps> = ({ style, children }) => {
  return <View style={[styles.container, style]}>
    {children}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})

export default Row;
