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
import { AppRoutes } from '@/routes/app-routes'

interface HomeSubServiceProps {
  style?: ViewStyle
  services: SubService[]
}

const HomeSubService: React.FC<HomeSubServiceProps> = React.memo(
  ({ style, services }) => {
    const colors = useColors()
    const padding = useSafeArea()
    const width = Metrics.screenWidth
    const styles = useMemo(() => createStyle(colors, padding), [
      colors,
      padding
    ])



    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          data={services}
          keyExtractor={(item, index) => `home-subservice-${item.id}`}
          renderItem={({ item }) => <ServiceItem service={item} />}
        />
      </View>
    )
  }
)

interface ItemProps {
  style?: ViewStyle
  service: SubService
}

const ServiceItem: React.FC<ItemProps> = React.memo(({ service }) => {
  const [size, setSize] = useState({ width: 0, height: 52 })
  useEffect(() => {
    Image.getSize(service.imageUrl, (width, height) => {
      setSize({
        height: 52,
        width: (width * 52) / height
      })
    })
  }, [service.imageUrl])

  const openScreen = () => {
    AppRoutes.openDummyScreen()
  }

  return (
    <BMTouchableOpacity style={itemStyles.imageContainer} onPress={openScreen}>
      <View style={[size, itemStyles.shadow]}>
        <BMImageView style={[size, itemStyles.shadow]} url={service.imageUrl} />
      </View>
    </BMTouchableOpacity>
  )
})

const itemStyles = StyleSheet.create({
  imageContainer: {
    marginVertical: 16,
    marginHorizontal: 4,
  },
  space: {
    width: 8
  },
  shadow: {
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  }
})

const createStyle = (colors: ColorPalette, padding: EdgeInsets) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background
    },
    flatListContainer: {
      paddingHorizontal: 12
    }
  })
}

export default HomeSubService
