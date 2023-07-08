import React from 'react'
import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native'

interface RowViewProps {
  style?: StyleProp<ViewStyle>
  activeOpacity?: number
}

const BMTouchableOpacity: React.FC<RowViewProps> = ({ style, children, activeOpacity }) => {
  return (
    <TouchableOpacity style={style} activeOpacity={activeOpacity ?? 0.7}>
      {children}
    </TouchableOpacity>
  )
}

export default BMTouchableOpacity
