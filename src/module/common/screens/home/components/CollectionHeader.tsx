import { flashSaleGraphicsImage, flashSaleImage } from "@/assets/images"
import Row from "@/components/row/Row"
import { RobotoBoldText } from "@/components/text/BMText"
import { ColorPalette } from "@/constants/colors"
import { fontSize } from "@/constants/font-size"
import useColors from "@/hooks/use-colors"
import { CollectionItem } from "@/models/home/collection"
import React, { useMemo } from "react"
import { Image, StyleSheet, View, ViewStyle } from "react-native"

interface ICollectionHeaderMerchant {
  style?: ViewStyle
  collection: CollectionItem
}


const CollectionHeaderMerchant: React.FC<ICollectionHeaderMerchant> = React.memo(({style, collection}) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])
  return <View style={styles.container}>
    <Row>
      <Image source={flashSaleImage} style={styles.imageFlashSale} />
    </Row>
    <RobotoBoldText fontStyle={fontSize.title2} color={colors.gray950} style={styles.textName}>{collection.item.name}</RobotoBoldText>
    <Image source={flashSaleGraphicsImage} style={styles.imageFlashSaleGraphics} />
  </View>
});

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingBottom: 14,
      paddingTop: 22,
      paddingHorizontal: 16
    }, 
    textName: {
      marginRight: 80,
    },
    imageFlashSale: {
      width: 98,
      height: 22,
    },
    imageFlashSaleGraphics: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 80,
      height: 80,
    }
  })
}

export default CollectionHeaderMerchant