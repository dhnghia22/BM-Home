import { ArrowRightIcon, FoodFeedIcon } from '@/assets/svg'
import BMImageView from '@/components/image/BMImageView'
import {
  BeaminBoldText,
  RobotoMediumText,
  RobotoRegularText
} from '@/components/text/BMText'
import BMTouchableOpacity from '@/components/touchable-opacity/BMTouchableOpacity'
import { ColorPalette, Colors } from '@/constants/colors'
import { commonStyles } from '@/constants/common-style'
import { fontSize } from '@/constants/font-size'
import useColors from '@/hooks/use-colors'
import { translate } from '@/i18n/translate'
import { Articles, FoodFeed } from '@/models/home/food-feed'
import { AppRoutes } from '@/routes/app-routes'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, Text, View, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface IHomeHomeFoodFeed {
  feed: FoodFeed
}

const HomeFoodFeedHeader: React.FC = React.memo(() => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  return (
    <View style={styles.container}>
      <BMTouchableOpacity
        style={[
          styles.headerContainer,
          commonStyles.padding_12_16,
          commonStyles.row
        ]}
      >
        <FoodFeedIcon />
        <BeaminBoldText
          style={[commonStyles.flex1, commonStyles.marginLeft8]}
          fontStyle={fontSize.title2}
        >
          {translate('home_screen.food_blog')}
        </BeaminBoldText>
        <ArrowRightIcon />
      </BMTouchableOpacity>
      {/* <FlatList
        horizontal
        style={styles.flatList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={() => <View style={styles.flatListSpace} />}
        data={feed.articles ?? []}
        keyExtractor={(item, index) => `food-blog-view-${index}`}
        ListFooterComponentStyle={{ width: 100, height: 100 }}
        ListFooterComponent={
          <View style={{ width: 100, height: 100 }}>
            <Text>Footer</Text>
          </View>
        }
        renderItem={({ item }) => {
          return <ArticleItem article={item} styles={styles} />
        }}
      /> */}
    </View>
  )
})

const FoodFeedItem: React.FC<IHomeHomeFoodFeed> = React.memo(({ feed }) => {
  const colors = useColors()
  const styles = useMemo(() => createStyle(colors), [colors])

  return (
    <FlatList
      horizontal
      style={styles.flatList}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
      ItemSeparatorComponent={() => <View style={styles.flatListSpace} />}
      data={feed.articles ?? []}
      keyExtractor={(item, index) => `food-blog-view-${item.thumbnail}-${index}`}
      ListFooterComponentStyle={{ width: 100, height: 100 }}
      renderItem={({ item }) => {
        return <ArticleItem article={item} styles={styles} />
      }}
    />
  )
})

interface IArticle {
  article: Articles
  styles?: ArticleStyle
}

type ArticleStyle = {
  itemContainer: ViewStyle
  imageBackground: object
  imageContainer: ViewStyle
  gradient: ViewStyle
  contentContainer: ViewStyle
  textTitle: ViewStyle
}

const ArticleItem: React.FC<IArticle> = React.memo(({ article, styles }) => {
  const openScreen = () => {
    AppRoutes.openDummyScreen()
  }
  return (
    <View style={styles.itemContainer}>
      <BMTouchableOpacity style={styles.imageContainer} onPress={openScreen}>
        <BMImageView url={article.thumbnail} style={styles.imageBackground} />
        <LinearGradient
          colors={['#000000', 'rgba(0, 0, 0, 0)']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.gradient}
        />
        <View style={styles.contentContainer}>
          <RobotoRegularText
            fontStyle={fontSize.title6}
            color={Colors.light.white}
          >
            {article.tag.toLocaleUpperCase()}
          </RobotoRegularText>
          <RobotoMediumText
            style={styles.textTitle}
            fontStyle={fontSize.title4}
            color={Colors.light.white}
            numberOfLines={2}
          >
            {article.title}
          </RobotoMediumText>
        </View>
      </BMTouchableOpacity>
    </View>
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
      paddingBottom: 16,
      backgroundColor: colors.background
    },
    imageContainer: {
      width: 192,
      height: 260,
      borderRadius: 12,
      overflow: 'hidden',
      justifyContent: 'flex-end'
    },
    imageBackground: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    contentContainer: {
      paddingHorizontal: 12,
      paddingBottom: 16
    },
    gradient: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      height: '50%'
    },
    textTitle: {
      height: 36
    }
  })
}

export { HomeFoodFeedHeader, FoodFeedItem }
