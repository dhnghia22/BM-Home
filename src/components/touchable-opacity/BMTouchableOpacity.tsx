import React from 'react'
import { StyleProp, ViewStyle, TouchableOpacity, GestureResponderEvent } from 'react-native'

interface RowViewProps {
  style?: StyleProp<ViewStyle>
  activeOpacity?: number
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const BMTouchableOpacity: React.FC<RowViewProps> = ({ style, onPress, children, activeOpacity }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style} activeOpacity={activeOpacity ?? 0.7}>
      {children}
    </TouchableOpacity>
  )
}

export default BMTouchableOpacity
