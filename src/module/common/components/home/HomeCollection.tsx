import { ColorPalette } from '@/constants/colors'
import { CollectionItem } from '@/models/home/collection'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native'
import CollectionHeaderMerchant from './CollectionHeader'
import useColors from '@/hooks/use-colors'
import MerchantItem from './MerchantItem'
import { COLLECTION_LAYOUT } from '@/constants/collection-type'
import CollectionGroupItem from './CollectionGroupItem'

interface ICollectionMerchant {
  style?: ViewStyle
  collection: CollectionItem
}

const HomeCollection: React.FC<ICollectionMerchant> = React.memo(
  ({ style, collection }) => {
    const colors = useColors()
    const styles = useMemo(() => createStyle(colors), [colors])

    return (
      <View style={styles.container}>
        <CollectionHeaderMerchant collection={collection} />
        <ListContent collection={collection} />
      </View>
    )
  }
)

const ListContent: React.FC<ICollectionMerchant> = ({ collection }) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  switch (collection.type) {
    case COLLECTION_LAYOUT.COLLECTION:
      return (
        <FlatList
          horizontal
          style={styles.flatList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <View style={styles.flatListSpace} />}
          data={collection.item.merchants ?? []}
          keyExtractor={(item, index) => `merchant-view-${item.id}`}
          renderItem={({ item }) => {
            return <MerchantItem merchant={item} />
          }}
        />
      )
    case COLLECTION_LAYOUT.COLLECTION_GROUP:
      return (
        <FlatList
          horizontal
          style={styles.flatList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <View style={styles.flatListSpace} />}
          data={collection.item.collections ?? []}
          keyExtractor={(item, index) => `collection-group-view-${item.id}`}
          renderItem={({ item }) => {
            return <CollectionGroupItem item={item} />
          }}
        />
      )
    default:
      return null
  }
}

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.gray100,
      paddingTop: 8
    },
    flatList: {
      backgroundColor: colors.background,
      overflow: 'visible',
      paddingBottom: 24
    },
    flatListContainer: {
      paddingHorizontal: 16
    },
    flatListSpace: {
      width: 12
    }
  })
}

export default HomeCollection
