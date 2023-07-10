import { ColorPalette, Colors } from '@/constants/colors'
import { IBMFontStyle, fontSize } from '@/constants/font-size'
import fonts from '@/assets/fonts'
import * as React from 'react'
import { Text, TextProps } from 'react-native'
import useColors from '@/hooks/use-colors'

interface IBMTextProps extends TextProps {
  color?: string
  fontFamily?: string
  fontStyle?: IBMFontStyle
  style?: object
}

const IBMText: React.FC<IBMTextProps> = ({
  fontFamily,
  color,
  fontStyle,
  style,
  children,
  ...props
}) => {
  const colors = useColors()
  const defaultFontFamily = fontFamily || fonts?.roboto?.regular
  const defaultColor = colors.black
  const defaultFontStyle = fontSize.title4


  const textStyles = {
    fontFamily: defaultFontFamily,
    fontSize: fontStyle?.fontSize || defaultFontStyle.fontSize,
    lineHeight: fontStyle?.lineHeight || defaultFontStyle.lineHeight,
    color: color || defaultColor
  }

  return (
    <Text style={[style, textStyles]} {...props}>
      {children}
    </Text>
  )
}

export const BeaminBoldText: React.FC<IBMTextProps> = ({
  fontFamily = fonts.beamin.bold,
  ...props
}) => {
  return <IBMText fontFamily={fontFamily} {...props} />
}

export const RobotoRegularText: React.FC<IBMTextProps> = (props) => {
  return <IBMText {...props} />
}

export const RobotoMediumText: React.FC<IBMTextProps> = ({
  fontFamily = fonts.roboto.medium,
  ...props
}) => {
  return <IBMText fontFamily={fontFamily} {...props} />
}

export const RobotoBoldText: React.FC<IBMTextProps> = ({
  fontFamily = fonts.roboto.bold,
  ...props
}) => {
  return <IBMText fontFamily={fontFamily} {...props} />
}

