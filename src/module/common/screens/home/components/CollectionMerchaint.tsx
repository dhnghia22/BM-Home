import { ColorPalette } from '@/constants/colors'
import { CollectionItem } from '@/models/home/collection'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native'
import CollectionHeaderMerchant from './CollectionHeader'
import useColors from '@/hooks/use-colors'
import MerchantItem from './Merchant'

interface ICollectionMerchant {
  style?: ViewStyle
  collection: CollectionItem
}

const CollectionMerchant: React.FC<ICollectionMerchant> = React.memo(
  ({ style, collection }) => {
    const colors = useColors()
    const styles = useMemo(() => createStyle(colors), [colors])

    return (
      <View style={styles.container}>
        <CollectionHeaderMerchant collection={collection} />
        <FlatList
          horizontal
          style={styles.flatList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <View style={styles.flatListSpace}/>}
          data={collection.item.merchants ?? []}
          keyExtractor={(item, index) => `merchant-view-${item.id}`}
          renderItem={({ item }) => {
            return <MerchantItem merchant={item} />
          }}
        />
      </View>
    )
  }
)

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.gray100,
      paddingTop: 8
    },
    flatList: {
      backgroundColor: colors.background
    },
    flatListContainer: {
      paddingHorizontal: 16
    },
    flatListSpace: {
      width: 8,
    }
  })
}

export default CollectionMerchant
