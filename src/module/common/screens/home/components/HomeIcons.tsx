import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { Metrics } from '@/constants/metrics'
import useColors from '@/hooks/use-colors'
import React, { useEffect, useMemo, useState } from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
  FlatList,
  Image
} from 'react-native'

import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context'
import BMImageView from '@/components/image/BMImageView'
import SubService from '@/models/home/sub-service'
import IconService from '@/models/home/icon'

interface HomeIconsServiceProps {
  style?: ViewStyle
  icons: IconService[]
}

const HomeIconsService: React.FC<HomeIconsServiceProps> = React.memo(
  ({ style, icons }) => {
    const colors = useColors()
    const padding = useSafeArea()
    const styles = useMemo(() => createStyle(colors, padding), [
      colors,
      padding
    ])

    console.log(icons)

    return (
      <View style={styles.container}>
        <FlatList
          numColumns={4}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{
            marginHorizontal: 7,
            marginBottom: 6,
          }}
          data={icons}
          keyExtractor={(item, index) => `home-icons-${item.id}`}
          renderItem={({ item }) => <IconItem service={item} />}
        />
      </View>
    )
  }
)

interface ItemProps {
  style?: ViewStyle
  service: SubService
}

const IconItem: React.FC<ItemProps> = React.memo(({ service }) => {
  return (
    <BMTouchableOpacity style={itemStyles.imageContainer}>
        <BMImageView style={itemStyles.image} url={service.imageUrl} resizeMode="contain" />
    </BMTouchableOpacity>
  )
})

const itemStyles = StyleSheet.create({
  imageContainer: {
    width: (Metrics.screenWidth - 20) / 4,
    height: (Metrics.screenWidth - 20) / 4,
  },
  image: {
    flex: 1,
    marginHorizontal: 3,
  }
})

const createStyle = (colors: ColorPalette, padding: EdgeInsets) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingBottom: 6
    }
  })
}

export default HomeIconsService
