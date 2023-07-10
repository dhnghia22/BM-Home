import { PromoBadgeSmallImage } from '@/assets/images'
import { MerchantVerifyIcon, RatingStarIcon } from '@/assets/svg'
import BMImageView from '@/components/image/BMImageView'
import Row from '@/components/row/Row'
import { RobotoRegularText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { commonStyles } from '@/constants/common-style'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { Merchant, Rating } from '@/models/home/merchant'

import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

interface IMerchant {
  merchant: Merchant
}

const MerchantItem: React.FC<IMerchant> = React.memo(({ merchant }) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  const isPartner = merchant.isPartner == true
  const merchantName = (isPartner ? '     ' : '') + (merchant.name || '')

  return (
    <BMTouchableOpacity style={styles.container}>
      <BMImageView style={styles.image} url={merchant.thumbnailImageUrl} />
      <Row style={commonStyles.marginBottom8}>
        <View>
          {isPartner && <MerchantVerifyIcon style={styles.imageVerify} />}
          <RobotoRegularText numberOfLines={2} fontStyle={fontSize.title3}>
            {merchantName}
          </RobotoRegularText>
        </View>
      </Row>
      {!!merchant.rating.score && (
        <MerchantItemRating rating={merchant.rating} style={styles} />
      )}
      {!!merchant.promoTagUrl ? (
        <BMImageView
          url={merchant.promoTagUrl}
          style={styles.imageTag}
          resizeMode="contain"
        />
      ) : merchant.provideCoupon ? (
        <BMImageView
          source={PromoBadgeSmallImage}
          style={styles.promoTag}
          resizeMode="contain"
        />
      ) : null}
    </BMTouchableOpacity>
  )
})

interface IMerchantRating {
  rating: Rating
  style: object
}

export const MerchantItemRating: React.FC<IMerchantRating> = React.memo(
  ({ rating, style }) => {
    const colors = useColors()
    return (
      <Row style={ratingStyles.row}>
        <RatingStarIcon />
        <RobotoRegularText fontStyle={fontSize.caption1} color={colors.gray800}>
          {rating.score}
        </RobotoRegularText>
        <RobotoRegularText
          fontStyle={fontSize.overline1}
          color={colors.gray500}
        >{` (${rating.totalRatings})`}</RobotoRegularText>
      </Row>
    )
  }
)

const ratingStyles = StyleSheet.create({
  row: {
    alignItems: 'center'
  }
})

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      width: 144,
      overflow: 'visible'
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 8,
      borderWidth: 0.4,
      borderColor: colors.gray400,
      marginBottom: 8
    },
    imageVerify: {
      top: 4,
      left: 0,
      position: 'absolute',

    },
    imageTag: {
      position: 'absolute',
      top: -10,
      left: -4,
      height: 20,
      width: 42
      // borderRadius: 8,
    },
    promoTag: {
      position: 'absolute',
      top: -4,
      left: -4,
      height: 20,
      width: 42
      // borderRadius: 8,
    },
    textScore: {
      color: colors.gray800
    }
  })
}

export default MerchantItem
