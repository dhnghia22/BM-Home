import { FavoriteHeartImage, PromoBadgeSmallImage } from '@/assets/images'
import { ReorderPartnerIcon } from '@/assets/svg'
import FlexView from '@/components/flex/FlexView'
import BMImageView from '@/components/image/BMImageView'
import Row from '@/components/row/Row'
import { BeaminBoldText, RobotoBoldText, RobotoRegularText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { commonStyles } from '@/constants/common-style'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { translate } from '@/i18n/translate'
import { Merchant } from '@/models/home/merchant'
import { Time } from '@/utils/time'
import React, { useMemo } from 'react'
import { FlatList, Image, StyleSheet, View, ViewStyle } from 'react-native'
import MerchantItem from './MerchantItem'

interface IHomeFavorite {
  merchants: Merchant[]
}

const HomeFavorite: React.FC<IHomeFavorite> = React.memo(({ merchants }) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        style={styles.flatList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={() => <View style={styles.flatListSpace} />}
        data={merchants}
        keyExtractor={(item, index) => `fav-merchant-view-${index}`}
        ListHeaderComponent={<FavoriteHeader />}
        // ListFooterComponentStyle={{ width: 100, height: 100 }}
        renderItem={({ item }) => {
          return <MerchantItem merchant={item} />
        }}
      />
    </View>
  )
})

const FavoriteHeader: React.FC = () => {
  return (
    <View style={headerStyles.container}>
      <BeaminBoldText fontStyle={headerStyles.title}>Quán bạn thích nè</BeaminBoldText>
      <Image source={FavoriteHeartImage} style={headerStyles.image} />
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    width: 102,
    flex: 1,
    justifyContent: 'center',
    marginRight: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
  },
  image: {
    width: 92,
    height: 28,
  },
});

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
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    flatListSpace: {
      width: 16
    },
  })
}

export default HomeFavorite
