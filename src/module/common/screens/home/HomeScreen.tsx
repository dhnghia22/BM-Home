import React, { useEffect, useMemo, useRef } from 'react'
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  SectionList,
  View
} from 'react-native'
import HomeHeader from '@/module/common/screens/home/components/HomeHeader'
import HomeSearch from './components/HomeSearch'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeData, fetchMoreHomeData } from '@/redux/actions/home-actions'
import { RootState } from '@/redux/reducers'
import { HomeState } from '@/redux/reducers/home-reducer'
import FlexView from '@/components/flex/FlexView'
import { API_STATUS } from '@/constants/status'
import Loading from '@/components/loading/Loading'
import { section as SectionType } from '@/redux/reducers/home-reducer'
import { get } from 'lodash'
import Banner from '@/models/home/banner'
import HomeBanner from '@/module/common/screens/home/components/HomeBanner'
import SubService from '@/models/home/sub-service'
import HomeSubService from '@/module/common/screens/home/components/HomeSubService'
import IconService from '@/models/home/icon'
import HomeIconsService from '@/module/common/screens/home/components/HomeIcons'
import HomeSubBanner from '@/module/common/screens/home/components/HomeSubBanner'
import { commonStyles } from '@/constants/common-style'
import HomeCollection from '@/module/common/screens/home/components/HomeCollection'
import { CollectionItem } from '@/models/home/collection'
import HomeEventHub from '@/module/common/screens/home/components/HomeEventHub'
import {
  FoodFeedItem,
  HomeFoodFeedHeader
} from '@/module/common/screens/home/components/HomeFoodFeed'
import HomeCoupon from '@/module/common/screens/home/components/HomeCoupon'
import { useSafeArea } from 'react-native-safe-area-context'
import HomeReorder from '@/module/common/screens/home/components/HomeReorder'
import HomeFavorite from '@/module/common/screens/home/components/HomeFavorite'
import { HomeCommonHeader } from './components/CollectionHeader'
import MerchantHorizontalItem from './components/MerchantHorizontalItem'
import { translate } from '@/i18n/translate'
import { Metrics } from '@/constants/metrics'

const CONTAINER_HEIGHT = 44

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch()
  const padding = useSafeArea()
  const [refreshing, setRefreshing] = React.useState(false)
  const state: HomeState = useSelector((state: RootState) => state.home)

  const scrollY = useRef(new Animated.Value(0)).current
  const offsetAnim = useRef(new Animated.Value(0)).current
  let scrollEndTimer = null

  useEffect(() => {
    dispatch(fetchHomeData())
    return () => {
      // clean up
    }
  }, [])

  useEffect(() => {
    // console.log(state.data)
  }, [state])

  useEffect(() => {
    updateRefreshing(state.status == API_STATUS.REFRESHING)
  }, [state.status])

  const updateRefreshing = (refresh: boolean) => {
    setRefreshing(refresh)
  }

  const renderItemFactory = (source: any, item: any) => {
    const data = get(item, 'item')
    switch (get(source, 'section')) {
      case SectionType.flashSaleSection:
      case SectionType.collectionSection:
        const collections = data as CollectionItem
        return !!collections ? (
          <HomeCollection collection={collections} />
        ) : null
      case SectionType.merchantSection:
        return <MerchantHorizontalItem merchant={data} />
      case SectionType.foodFeedSection:
        return <FoodFeedItem feed={data} />
      default:
        return null
    }
  }

  const renderSectionFactory = (section: any) => {
    switch (get(section, 'section') || '') {
      case SectionType.bannerSection:
        const banners = get(section, 'banners') || []
        if (banners.length == 0) return null
        return <HomeBanner banners={banners} />
      case SectionType.iconSection:
        const icons = get(section, 'icons') || []
        if (icons.length == 0) return null
        return <HomeIconsService icons={icons} />
      case SectionType.subBannerSection:
        const subBanners = get(section, 'subbanners') || []
        if (subBanners.length == 0) return null
        return <HomeSubBanner banners={subBanners} />
      case SectionType.subserviceSection:
        const subServices = get(section, 'subservices') || []
        if (subServices.length == 0) return null
        return <HomeSubService services={subServices} />
      case SectionType.eventHubSection:
        const eventHub = get(section, 'event')
        return !!eventHub ? <HomeEventHub eventHub={eventHub} /> : null
      case SectionType.foodFeedSection:
        const feeds = get(section, 'data') || []
        return feeds.length > 0 ? <HomeFoodFeedHeader /> : null
      case SectionType.promotion:
        const coupon = get(section, 'coupon')
        return !!coupon ? <HomeCoupon coupon={coupon} /> : null
      case SectionType.reorderSection:
        const orders = get(section, 'orders') || []
        return orders.length > 0 ? <HomeReorder orders={orders} /> : null
      case SectionType.favoriteSection:
        const favMerchants = get(section, 'merchants') || []
        return favMerchants.length > 0 ? (
          <HomeFavorite merchants={favMerchants} />
        ) : null
      case SectionType.merchantSection:
        const merchants = get(section, 'data') || []
        return merchants.length > 0 ? (
          <HomeCommonHeader
            title={translate('home_screen.restaurants_near_you')}
          />
        ) : null
      default:
        return null
    }
  }

  const merchants = useMemo(() => {
    const merchant = (state.data || []).filter(
      (e) => get(e, 'section') == SectionType.merchantSection
    )
    if (merchant.length > 0) {
      return merchant[0]
    }
    return null
  }, [state.data])

  const loadMore = () => {
    if (!!merchants && get(merchants, 'page') >= get(merchants, 'total')) {
      return
    }
    if (state.status == API_STATUS.SUCCESS) {
      dispatch(fetchMoreHomeData((get(merchants, 'page') || 0) + 1))
    }
  }

  const onRefresh = () => {
    dispatch(fetchHomeData(true))
  }

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp'
      }),
      offsetAnim
    ),
    0,
    CONTAINER_HEIGHT
  )
  var _clampedScrollValue = 0
  var _offsetValue = 0
  var _scrollValue = 0

  
  useEffect(() => {
    scrollY.addListener(({ value }) => { 
      const diff = value - _scrollValue
      _scrollValue = value
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        CONTAINER_HEIGHT
      )
    })
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value
    })
  }, [])

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer)
  }
  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > CONTAINER_HEIGHT &&
      _clampedScrollValue > CONTAINER_HEIGHT / 2
        ? _offsetValue + CONTAINER_HEIGHT
        : _offsetValue - CONTAINER_HEIGHT

    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true
    }).start()
  }
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250)
  }

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: 'clamp'
  })

  return (
    <>
      <HomeHeader />
      <FlexView>
        <Animated.SectionList
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y - Metrics.screenHeight)
          }}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag }
          scrollEventThrottle={1}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{
            paddingBottom: padding.bottom
          }}
          contentInset={{ top: CONTAINER_HEIGHT }}
          contentOffset={{ x: 0, y: CONTAINER_HEIGHT }}
          style={commonStyles.flex1}
          sections={state.data || []}
          renderSectionHeader={({ section }) => renderSectionFactory(section)}
          renderItem={(item) => renderItemFactory(item.section, item)}
          keyExtractor={(item, index) => `home-section-${index}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.8}
          ListFooterComponent={() => {
            if ((
              !!merchants &&
              get(merchants, 'page') >= get(merchants, 'total')
            ) || !merchants) {
              return <></>
            }
            return (
              <View
                style={{ width: '100%', height: 40, justifyContent: 'center' }}
              >
                <ActivityIndicator animating={true} size="small" />
              </View>
            )
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            height: CONTAINER_HEIGHT,
            transform: [{ translateY: headerTranslate }]
          }}
        >
          <HomeSearch />
        </Animated.View>
        {state.status == API_STATUS.LOADING && (
          <View style={commonStyles.fit}>
            <Loading />
          </View>
        )}
      </FlexView>
    </>
  )
}

export default HomeScreen
