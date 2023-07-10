import { EventBannerImage } from '@/assets/images'
import { RobotoBoldText, RobotoRegularText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { EventHub } from '@/models/home/eventhub'
import React, { useMemo } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

interface IHomeEventBanner {
  eventHub: EventHub
}

const HomeEventHub: React.FC<IHomeEventBanner> = React.memo(({ eventHub }) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  return <View style={styles.container}>
    <BMTouchableOpacity style={styles.imageContainer}>
      <ImageBackground style={styles.backgroundImage} source={EventBannerImage}>
        <RobotoBoldText fontStyle={fontSize.title2} color={colors.white}>{eventHub.title}</RobotoBoldText>
        <RobotoRegularText fontStyle={fontSize.body1} color={colors.white}>{eventHub.description}</RobotoRegularText>
      </ImageBackground>
    </BMTouchableOpacity>
  </View>
})

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.gray100,
      paddingTop: 8
    },
    imageContainer: {
      backgroundColor: colors.background,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    backgroundImage: {
      aspectRatio: 343 / 96,
      paddingHorizontal: 16,
      justifyContent: 'center'
    }
  })
}

export default HomeEventHub
