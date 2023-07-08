import React, { Children } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

interface FlexViewProps {
  style?: ViewStyle
}

const FlexView: React.FC<FlexViewProps> = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default FlexView;
