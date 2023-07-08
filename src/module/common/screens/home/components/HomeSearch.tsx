import { HomeSearchIcon } from '@/assets/svg'
import Row from '@/components/row/Row'
import { RobotoRegularText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { translate } from '@/i18n/translate'
import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context'

const HomeSearch: React.FC = () => {
  const colors = useColors()
  const padding = useSafeArea()
  const styles = useMemo(() => createStyle(colors, padding), [colors, padding])

  return (
    <View style={[styles.container]}>
      <BMTouchableOpacity style={styles.button}>
        <Row style={styles.itemCenter}>
          <View style={styles.icon}>
            <HomeSearchIcon />
          </View>
          <RobotoRegularText fontStyle={fontSize.body1} color={colors.gray400}>
           {translate("home_screen.search_placeholder")}
          </RobotoRegularText>
        </Row>
      </BMTouchableOpacity>
    </View>
  )
}

const createStyle = (colors: ColorPalette, padding: EdgeInsets) => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0, 
      right: 0,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 4,
      paddingBottom: 8
    },
    button: {
      paddingVertical: 4,
      alignItems: 'center',
      backgroundColor: colors.gray100,
      borderRadius: 16
    },
    icon: {
      marginRight: 8,
      width: 24,
      height: 24
    },
    itemCenter: {
      alignItems: 'center'
    }
  })
}

export default HomeSearch
