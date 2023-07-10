import { PromoBadgeSmallImage } from '@/assets/images'
import { ReorderPartnerIcon } from '@/assets/svg'
import FlexView from '@/components/flex/FlexView'
import BMImageView from '@/components/image/BMImageView'
import Row from '@/components/row/Row'
import { RobotoBoldText, RobotoRegularText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { commonStyles } from '@/constants/common-style'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { translate } from '@/i18n/translate'
import { Merchant } from '@/models/home/merchant'
import { AppRoutes } from '@/routes/app-routes'
import { Time } from '@/utils/time'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native'

interface IHomeReorder {
  orders: Merchant[]
}

const HomeReorder: React.FC<IHomeReorder> = React.memo(({ orders }) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, commonStyles.padding_12_16]}>
        <RobotoBoldText fontStyle={fontSize.title2}>
          {translate('home_screen.reorder_title')}
        </RobotoBoldText>
      </View>
      <FlatList
        horizontal
        style={styles.flatList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={() => <View style={styles.flatListSpace} />}
        data={orders}
        keyExtractor={(item, index) => `food-blog-view-${index}`}
        ListFooterComponentStyle={{ width: 100, height: 100 }}
        renderItem={({ item }) => {
          return <ReorderItem order={item} styles={styles} />
        }}
      />
    </View>
  )
})

interface IReorderItem {
  order: Merchant
  styles?: ArticleStyle
}

type ArticleStyle = {
  itemContainer: ViewStyle
  imageOrder: object
  promoTag: object
  iconVerify: object
}

const ReorderItem: React.FC<IReorderItem> = React.memo(({ order, styles }) => {
  const isPartner = order.isPartner == true
  const name = (isPartner ? '    ' : '') + (order.name || '')
  const provideCoupon = order.provideCoupon
  const colors = useColors()
  const openScreen = () => {
    AppRoutes.openDummyScreen()
  }
  return (
    <BMTouchableOpacity style={styles.itemContainer} onPress={openScreen}>
      <Row>
        <BMImageView url={order.imageUrl} style={styles.imageOrder} />
        <FlexView>
          <FlexView>
            {isPartner && (
              <View style={styles.iconVerify}>
                <ReorderPartnerIcon />
              </View>
            )}
            <RobotoRegularText
              style={commonStyles.flex1}
              numberOfLines={2}
              fontStyle={fontSize.title3}
            >
              {name}
            </RobotoRegularText>
          </FlexView>
          <RobotoRegularText
            color={colors.gray600}
            fontStyle={fontSize.caption1}
          >{`${translate('home_screen.last_order')} ${Time.convertTime(
            order.lastOrderedAt
          )}`}</RobotoRegularText>
        </FlexView>
        {!!provideCoupon && (
          <BMImageView
            source={PromoBadgeSmallImage}
            style={styles.promoTag}
            resizeMode="contain"
          />
        )}
      </Row>
    </BMTouchableOpacity>
  )
})

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.gray100,
      paddingTop: 8
    },
    headerContainer: {
      backgroundColor: colors.background,
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    backgroundImage: {
      aspectRatio: 343 / 96,
      paddingHorizontal: 16,
      justifyContent: 'center'
    },
    flatList: {
      backgroundColor: colors.background
    },
    flatListContainer: {
      paddingHorizontal: 16
    },
    flatListSpace: {
      width: 16
    },
    itemContainer: {
      padding: 16,
      backgroundColor: colors.background,
      width: 320,
      height: 120,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.gray100,
      marginBottom: 24
    },
    imageOrder: {
      width: 88,
      height: 88,
      borderRadius: 8,
      overflow: 'hidden',
      marginRight: 12
    },
    promoTag: {
      position: 'absolute',
      top: -4,
      left: -4,
      height: 20,
      width: 42
    },
    iconVerify: { position: 'absolute', top: 6 }
  })
}

export default HomeReorder
