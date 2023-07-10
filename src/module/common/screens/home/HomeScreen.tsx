import React, { useEffect, useMemo } from 'react'
import { RefreshControl, SectionList, View } from 'react-native'
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
import HomeFoodFeed from '@/module/common/screens/home/components/HomeFoodFeed'
import HomeCoupon from '@/module/common/screens/home/components/HomeCoupon'
import { useSafeArea } from 'react-native-safe-area-context'
import HomeReorder from '@/module/common/screens/home/components/HomeReorder'
import HomeFavorite from '@/module/common/screens/home/components/HomeFavorite'
import { HomeCommonHeader } from './components/CollectionHeader'
import MerchantHorizontalItem from './components/MerchantHorizontalItem'
import { translate } from '@/i18n/translate'

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch()
  const padding = useSafeArea()
  const state: HomeState = useSelector((state: RootState) => state.home)

  useEffect(() => {
    dispatch(fetchHomeData())
    return () => {
      // clean up
    }
  }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

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
        const feed = get(section, 'feed')
        return !!feed ? <HomeFoodFeed feed={feed} /> : null
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
          <HomeCommonHeader title={translate("home_screen.restaurants_near_you")} />
        ) : null
      default:
        return null
    }
  }

  const loadMore = () => {
    if (state.status == API_STATUS.SUCCESS) {
      const merchant = (state.data || []).filter(
        (e) => get(e, 'section') == SectionType.merchantSection
      )
      if (merchant.length > 0) {
        const item = merchant[0]
        if (get(item, 'page') >= get(item, 'total')) {
          return
        }
        dispatch(fetchMoreHomeData((get(item, 'page') || 0) + 1))
      }
    }
  }

  return (
    <>
      <HomeHeader />
      <FlexView>
        <SectionList
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{
            paddingTop: 40,
            paddingBottom: padding.bottom
          }}
          style={commonStyles.flex1}
          sections={state.data || []}
          renderSectionHeader={({ section }) => renderSectionFactory(section)}
          renderItem={(item) => renderItemFactory(item.section, item)}
          keyExtractor={(item, index) => `home-section-${index}`}
          refreshControl={
            <RefreshControl removeClippedSubviews={true} refreshing={false} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.8}
        />
        <HomeSearch />
        {state.status == API_STATUS.LOADING && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <Loading />
          </View>
        )}
      </FlexView>
    </>
  )
}

export default HomeScreen
