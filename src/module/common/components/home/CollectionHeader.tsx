import { FlashSaleGraphicsImage, FlashSaleImage } from '@/assets/images'
import ArrowRightSvg from '@/assets/svg/ArrowRightSvg'
import FlashSaleCountDown from '@/components/count-down/FlashSaleCountDown'
import Row from '@/components/row/Row'
import { RobotoBoldText, RobotoRegularText } from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { COLLECTION_LAYOUT, COLLECTION_TYPE } from '@/constants/collection-type'
import { ColorPalette } from '@/constants/colors'
import { commonStyles } from '@/constants/common-style'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { CollectionItem } from '@/models/home/collection'
import { Time } from '@/utils/time'
import React, { useMemo } from 'react'
import { Image, StyleSheet, View, ViewStyle } from 'react-native'

interface ICollectionHeaderMerchant {
  style?: ViewStyle
  collection: CollectionItem
}

const CollectionHeaderMerchant: React.FC<ICollectionHeaderMerchant> =
  React.memo(({ style, collection }) => {
    switch (collection.type) {
      case COLLECTION_LAYOUT.COLLECTION:
        switch (collection.item.type) {
          case COLLECTION_TYPE.FLASH_SALE:
            return <CollectionHeaderFlashSaleMerchant collection={collection} />
          case COLLECTION_TYPE.COMMON:
            return <CollectionHeaderNormalMerchant collection={collection} />
          default:
            return null
        }
      case COLLECTION_LAYOUT.COLLECTION_GROUP:
        return <CollectionHeaderGroup collection={collection} />
      default:
        return null
    }
  })

const CollectionHeaderFlashSaleMerchant: React.FC<ICollectionHeaderMerchant> =
  React.memo(({ style, collection }) => {
    const colors = useColors()
    const styles = useMemo(() => createStyle(colors), [colors])

    return (
      <View style={styles.container}>
        <Row>
          <Image source={FlashSaleImage} style={styles.imageFlashSale} />
          <FlashSaleCountDown expiredTime={Time.convertMinutesToDate(60 * 23)} />
        </Row>
        <RobotoBoldText
          fontStyle={fontSize.title2}
          color={colors.gray950}
          style={styles.textName}
        >
          {collection.item.name}
        </RobotoBoldText>
        <Image
          source={FlashSaleGraphicsImage}
          style={styles.imageFlashSaleGraphics}
        />
      </View>
    )
  })

const CollectionHeaderGroup: React.FC<ICollectionHeaderMerchant> = React.memo(
  ({ style, collection }) => {
    const colors = useColors()
    const styles = useMemo(() => createStyle(colors), [colors])
    return (
      <View style={styles.containerGroup}>
        <RobotoBoldText fontStyle={fontSize.title2} color={colors.gray950}>
          {collection.item.name}
        </RobotoBoldText>
      </View>
    )
  }
)

const CollectionHeaderNormalMerchant: React.FC<ICollectionHeaderMerchant> =
  React.memo(({ style, collection }) => {
    const colors = useColors()
    const styles = useMemo(() => createStyle(colors), [colors])
    return (
      <BMTouchableOpacity
        style={[styles.container, commonStyles.row, commonStyles.alignCenter]}
      >
        <View style={commonStyles.flex1}>
          <RobotoBoldText fontStyle={fontSize.title2} color={colors.gray950}>
            {collection.item.name}
          </RobotoBoldText>
          <RobotoRegularText fontStyle={fontSize.body1} color={colors.gray600}>
            {collection.item.description}
          </RobotoRegularText>
        </View>
        <ArrowRightSvg color={colors.gray500} />
      </BMTouchableOpacity>
    )
  })

export const HomeCommonHeader: React.FC<{ title: string }> = React.memo(
  ({ title }) => {
    const colors = useColors()
    const styles = useMemo(() => createStyle(colors), [colors])
    return (
      <>
        <View style={styles.line} />
        <View style={styles.containerGroup}>
          <RobotoBoldText fontStyle={fontSize.title2} color={colors.gray950}>
            {title}
          </RobotoBoldText>
        </View>
      </>
    )
  }
)

const createStyle = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingBottom: 14,
      paddingTop: 22,
      paddingHorizontal: 16
    },
    textName: {
      marginRight: 80
    },
    imageFlashSale: {
      width: 98,
      height: 22
    },
    imageFlashSaleGraphics: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 80,
      height: 80
    },
    containerGroup: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.background
    },
    line: {
      backgroundColor: colors.gray100,
      height: 8
    }
  })
}

export default CollectionHeaderMerchant
