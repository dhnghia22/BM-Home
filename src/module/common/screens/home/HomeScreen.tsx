import React, { useEffect, useMemo } from 'react'
import { RefreshControl, SectionList, View } from 'react-native'
import HomeHeader from './components/HomeHeader'
import HomeSearch from './components/HomeSearch'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/redux/actions/home-actions'
import { RootState } from '@/redux/reducers'
import { HomeState } from '@/redux/reducers/home-reducer'
import FlexView from '@/components/flex/FlexView'
import { API_STATUS } from '@/constants/status'
import Loading from '@/components/loading/Loading'
import { section as SectionType } from '@/redux/reducers/home-reducer'
import { get } from 'lodash'
import Banner from '@/models/home/banner'
import HomeBanner from './components/HomeBanner'
import SubService from '@/models/home/sub-service'
import HomeSubService from './components/HomeSubService'
import IconService from '@/models/home/icon'
import HomeIconsService from './components/HomeIcons'
import HomeSubBanner from './components/HomeSubBanner'
import { commonStyles } from '@/constants/common-style'
import CollectionMerchant from './components/CollectionMerchaint'
import { CollectionItem } from '@/models/home/collection'

const HomeScreen: React.FC = () => {
  const dispath = useDispatch()
  const state: HomeState = useSelector((state: RootState) => state.home)

  useEffect(() => {
    console.log('dispath fecth home data')
    dispath(fetchData())
    return () => {
      // clean up
    }
  }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

  const renderItemFactory = (source: string, item: any) => {
    const data = get(item, 'item');
    switch (get(source, 'section')) {
      case SectionType.bannerSection:
      case SectionType.subserviceSection:
      case SectionType.iconSection:
      case SectionType.subBannerSection:
        return null;
      case SectionType.flashSaleSection:
        const flashSaleCollection = data as CollectionItem
        return <CollectionMerchant collection={flashSaleCollection} />
      default:
        return null;
    }
  }

  const renderSectionFactory = (section: any) => {
    console.log(section)
    const data = get(section, 'data') || []
    switch (get(section, 'section') || '') {
      case SectionType.bannerSection:
        const banners = data as Banner[]
        return <HomeBanner banners={banners} />
      case SectionType.subserviceSection:
        const subServices = data as SubService[]
        return <HomeSubService services={subServices} />
      // case SectionType.iconSection:
      //   const icons = data as IconService[]
      //   return <HomeIconsService icons={icons} />
      // case SectionType.subBannerSection:
      //     const subBanners = data as Banner[]
      //     return <HomeSubBanner banners={subBanners} />
      default:
        return null;
    }
  }

  return (
    <>
      <HomeHeader />
      {state.status == API_STATUS.SUCCESS ? (
        <FlexView>
          <SectionList
            contentInset={{ top: 40 }}
            stickySectionHeadersEnabled={false}
            // automaticallyAdjustContentInsets={false}
            style={commonStyles.flex1}
            sections={state.data}
            renderSectionHeader={({ section }) => renderSectionFactory(section)}
            renderItem={(item) => renderItemFactory(item.section, item)}
            keyExtractor={(item, index) => `home-section-${index}`}
            refreshControl={
              <RefreshControl
                removeClippedSubviews={true}
                refreshing={false}
              />
            }
          />
          <HomeSearch />
        </FlexView>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default HomeScreen
