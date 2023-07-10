import { PromoBadgeSmallImage } from '@/assets/images'
import { MerchantVerifyIcon, RatingStarIcon } from '@/assets/svg'
import FlexView from '@/components/flex/FlexView'
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
import { MerchantItemRating } from './MerchantItem'
import { convertMetersToKilometers } from '@/utils/number'
import { AppRoutes } from '@/routes/app-routes'

interface IMerchant {
  merchant: Merchant
}

const MerchantHorizontalItem: React.FC<IMerchant> = React.memo(
  ({ merchant }) => {
    const colors = useColors()
    const styles = useMemo(() => createStyle(colors), [colors])

    const isPartner = merchant.isPartner == true
    const merchantName = (isPartner ? '     ' : '') + (merchant.name || '')

    const openScreen = () => {
      AppRoutes.openDummyScreen()
    }
    

    return (
      <BMTouchableOpacity style={styles.container} onPress={openScreen}>
        <Row>
          <BMImageView style={styles.image} url={merchant.thumbnailImageUrl} />
          <FlexView>
            <FlexView>
              <View>
              {isPartner && <MerchantVerifyIcon style={styles.imageVerify} />}
              <RobotoRegularText style={styles.textName} numberOfLines={2} fontStyle={fontSize.title3}>
                {merchantName}
              </RobotoRegularText>
              </View>
              {!!merchant.recommendMenu && (
                <RobotoRegularText
                  numberOfLines={1}
                  fontStyle={fontSize.caption1}
                  color={colors.gray600}
                >
                  {merchant.recommendMenu}
                </RobotoRegularText>
              )}
            </FlexView>
            {!!merchant.rating.score && (
              <Row>
                 <MerchantItemRating rating={merchant.rating} style={styles} />
                 {merchant.distance && <RobotoRegularText fontStyle={fontSize.caption1}>{`  •  ${convertMetersToKilometers(merchant.distance)}km`}</RobotoRegularText>}
              </Row>
            )}
          </FlexView>
          {merchant.provideCoupon && (
            <BMImageView
              source={PromoBadgeSmallImage}
              style={styles.promoTag}
              resizeMode="contain"
            />
          )}
        </Row>
      </BMTouchableOpacity>
    )
  }
)

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: 16,
      borderBottomColor: colors.gray100,
      borderBottomWidth: 1
    },
    image: {
      width: 88,
      height: 88,
      borderRadius: 8,
      borderWidth: 0.4,
      borderColor: colors.gray400,
      marginRight: 12,
    },
    imageVerify: {
      top: 4,
      left: 0,
      position: 'absolute',
    },
    promoTag: {
      position: 'absolute',
      top: -4,
      left: -4,
      height: 20,
      width: 42
      // borderRadius: 8,
    },
    textName: {
      marginBottom: 2,
    }
  })
}

export default MerchantHorizontalItem
