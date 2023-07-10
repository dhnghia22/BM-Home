import BMImageView from '@/components/image/BMImageView'
import { RobotoMediumText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import Banner from '@/models/home/banner'

import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'

interface ICollectionGroup {
  item: Banner
}

const CollectionGroupItem: React.FC<ICollectionGroup> = React.memo(
  ({ item }) => {
    const colors = useColors()
    const styles = useMemo(() => createStyle(colors), [colors])

    return (
      <BMTouchableOpacity style={styles.container}>
        <BMImageView style={styles.image} url={item.imageUrl} />
        <RobotoMediumText fontStyle={fontSize.title4}>
          {item.name}
        </RobotoMediumText>
      </BMTouchableOpacity>
    )
  }
)

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      width: 222
    },
    image: {
      width: 222,
      height: 110,
      overflow: 'hidden',
      borderRadius: 8,
      marginBottom: 8
    }
  })
}

export default CollectionGroupItem
