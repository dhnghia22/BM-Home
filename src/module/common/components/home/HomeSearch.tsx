import { HomeSearchIcon } from '@/assets/svg'
import Row from '@/components/row/Row'
import { RobotoRegularText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { translate } from '@/i18n/translate'
import { AppRoutes } from '@/routes/app-routes'
import React, { useEffect, useMemo, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context'

const HomeSearch = () => {

  const colors = useColors()
  const padding = useSafeArea()
  const styles = useMemo(() => createStyle(colors, padding), [colors, padding])

  const openScreen = () => {
    AppRoutes.openDummyScreen()
  }

  return (
    <View style={styles.container}>
      <BMTouchableOpacity style={styles.button} onPress={openScreen}>
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
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 4,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray200
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
