import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { commonStyles } from '@/constants/common-style'
import { Metrics } from '@/constants/metrics'
import useColors from '@/hooks/use-colors'
import Banner from '@/models/home/banner'
import React, { useMemo } from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context'
import BMImageView from '@/components/image/BMImageView'

const { width: screenWidth } = Dimensions.get('window')

interface HomeBannerProps {
  style?: ViewStyle
  banners: Banner[]
}

const HomeSubBanner: React.FC<HomeBannerProps> = ({ style, banners }) => {
  const colors = useColors()
  const padding = useSafeArea()
  const height = ((Metrics.screenWidth - 16) / 343) * 72
  const styles = useMemo(() => createStyle(colors, padding), [colors, padding])

  return (
    <View
      style={
        styles.container
      }
    >
      <Carousel
        loop
        autoplay
        sliderWidth={screenWidth}
        sliderHeight={height + 8}
        itemWidth={screenWidth - 24}
        itemHeight={height}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        data={banners}
        renderItem={({ item }) => {
          return <BannerItem banner={item} />
        }}
        keyExtractor={(item, index) => `sub-banner-${item?.id}_${index}`}
      />
    </View>
  )
}

interface BannerItemProps {
  style?: ViewStyle
  banner: Banner
}

const BannerItem: React.FC<BannerItemProps> = React.memo(({ banner }) => {
  return (
    <BMTouchableOpacity style={itemStyles.imageContainer}>
      <BMImageView
        style={commonStyles.flex1}
        url={banner.imageUrl}
      />
    </BMTouchableOpacity>
  )
})

const itemStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
  }
})

const createStyle = (colors: ColorPalette, padding: EdgeInsets) => {
  const height = ((Metrics.screenWidth - 16) / 343) * 72
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      height: height + 24
    }
  })
}

export default HomeSubBanner
