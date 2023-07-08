import BMImageView from "@/components/image/BMImageView"
import { ColorPalette } from "@/constants/colors"
import useColors from "@/hooks/use-colors"
import { CollectionItem, Merchant } from "@/models/home/collection"

import React, { useMemo } from "react"
import { StyleSheet, View, ViewStyle } from "react-native"

interface IMerchant {
  merchant: Merchant
}

const MerchantItem: React.FC<IMerchant> = React.memo(({merchant}) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])
  console.log('itemmmm ', merchant.imageUrl);
  return <View style={styles.container}>
    <BMImageView style={styles.image} url={merchant.thumbnailImageUrl} />
  </View>
});

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    image: {
      width: 144,
      height: 144,
      borderRadius: 8,
      borderWidth: 0.4,
      borderColor: colors.gray400
    }
  })
}

export default MerchantItem;