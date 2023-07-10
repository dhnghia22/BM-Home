import { ArrowRightIcon, CouponIcon } from '@/assets/svg'
import {
  RobotoMediumText,
} from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette } from '@/constants/colors'
import { commonStyles } from '@/constants/common-style'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { translate } from '@/i18n/translate'
import { Coupon } from '@/models/home/coupon'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import HomeUserMember from './HomeUserMember'
import ArrowRightSvg from '@/assets/svg/ArrowRightSvg'

interface IHomeCoupon {
  coupon: Coupon
}

const HomeCoupon: React.FC<IHomeCoupon> = React.memo(({ coupon }) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  return (
    <>
    <View style={styles.container}>
      <BMTouchableOpacity style={styles.contentContainer}>
        <View style={[commonStyles.center, styles.icon]}>
          <CouponIcon />
        </View>
        <RobotoMediumText
          style={styles.textContent}
          color={colors.primary}
          fontStyle={fontSize.title4}
        >
          {translate('home_screen.coupon_desc', {count: coupon.count})}
        </RobotoMediumText>
        <ArrowRightSvg color={colors.primary} />
      </BMTouchableOpacity>
    </View>
    <HomeUserMember />
    </>
  )
})

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.gray100,
      paddingTop: 8
    },
    contentContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: 8,
      flexDirection: 'row',
      alignItems: 'center'
    },
    textContent: {
      flex: 1,
      marginHorizontal: 8
    },
    icon:  {width: 48,height: 48}
  })
}

export default HomeCoupon
