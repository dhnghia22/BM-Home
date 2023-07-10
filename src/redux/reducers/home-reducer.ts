import { API_STATUS } from '@/constants/status'
import { ActionType } from '@/interface/action-type'
import {
  HOME_FETCH_MORE_DATA,
  HOME_FETCH_MORE_SUCCESS,
  HOME_FETCH_SUCCESS,
  HOME_SET_ERROR,
  HOME_SET_LOADING,
  HOME_SET_REFRESHING
} from '../types/home-types'

import { get, pick } from 'lodash'
import { mapToBannerArray } from '@/models/home/banner'
import { mapToSubServiceArray } from '@/models/home/sub-service'
import { mapToIconServiceArray } from '@/models/home/icon'
import { RootState } from '.'

export const section = {
  bannerSection: 'bannerSection',
  subserviceSection: 'subserviceSection',
  iconSection: 'iconSection',
  subBannerSection: 'subBannerSection',
  eventSection: 'eventSection',
  flashSaleSection: 'flashSaleSection',
  eventHubSection: 'eventHubSection',
  foodFeedSection: 'foodFeedSection',
  promotion: 'promotion',
  collectionSection: 'collectionSection',
  reorderSection: 'reorderSection',
  favoriteSection: 'favoriteSection',
  merchantSection: 'merchantSection',
  sectionOrdering: 'sectionOrdering'
}

export interface HomeState {
  data: Array<any>
  status: API_STATUS
  errorMessage: string | null
}

const homeInitialState: HomeState = {
  data: [], // Initialize as an empty array directly
  status: API_STATUS.DEFAULT,
  errorMessage: null
}

const mapResponseToSection = (data: any): Array<any> => {
  const sectionOrdering = get(data, section.sectionOrdering)
  const sectionOrders: string[] = Array.isArray(sectionOrdering)
    ? sectionOrdering.filter((item) => typeof item === 'string')
    : []
  return sectionOrders
    .map((e: string) => {
      return mapToModel(e, get(data, `${e}`))
    })
    .filter((item) => item !== null)
}

const mapMerchants = (items: any[], data: any): any[] => {
  const merchantSection = get(data, `${section.merchantSection}`)
  const docs = get(merchantSection, 'docs') || []
  if (Array.isArray(docs) && docs.length > 0) {
    return items.map((e) => {
      if (get(e, 'section') == section.merchantSection) {
        return {
          ...e,
          ...pick(merchantSection, ['pages', 'page', 'limit', 'total']),
          data: [...get(e, 'data'), ...docs]
        }
      }
      return e
    })
  }
  return items
}

const mapToModel = (type: string, data?: any): any => {
  if (data == null) {
    return null
  }
  switch (type) {
    case section.bannerSection:
      const banners = get(data, 'banners', [])
      return {
        section: type,
        data: [],
        banners: mapToBannerArray(banners)
      }
    case section.subserviceSection:
      const subServices = get(data, 'subservices', [])
      return {
        section: type,
        data: [],
        subservices: mapToSubServiceArray(subServices)
      }
    case section.iconSection:
      const icons = get(data, 'icons', [])
      return {
        section: type,
        data: [],
        icons: mapToIconServiceArray(icons)
      }
    case section.subBannerSection:
      const subBanners = get(data, 'subbanners', [])
      return {
        section: type,
        data: [],
        subbanners: mapToBannerArray(subBanners)
      }
    case section.flashSaleSection:
      return {
        section: type,
        link: get(data, 'link') || '',
        data: get(data, 'items') || []
      }
    case section.eventHubSection:
      return {
        section: type,
        data: [],
        event: data
      }
    case section.foodFeedSection:
      return {
        section: type,
        data: [get(data, 'foodFeed')],
        link: get(data, 'foodFeed.link')
      }
    case section.promotion:
      return {
        section: type,
        data: [],
        coupon: get(data, 'coupon')
      }
    case section.collectionSection:
      return {
        section: type,
        link: get(data, 'link') || '',
        data: get(data, 'items') || []
      }
    case section.reorderSection:
      return {
        section: type,
        orders: data,
        data: []
      }
    case section.favoriteSection:
      return {
        section: type,
        merchants: data,
        data: []
      }
    case section.merchantSection:
      return {
        section: type,
        data: get(data, 'docs') || [],
        ...pick(data, ['pages', 'page', 'limit', 'total'])
      }
    default:
      return null
  }
}

function homeReducer(state = homeInitialState, action: ActionType) {
  switch (action.type) {
    case HOME_SET_LOADING:
      return {
        ...state,
        status: API_STATUS.LOADING
      }
    case HOME_SET_REFRESHING:
      return {
        ...state,
        status: API_STATUS.REFRESHING
      }
    case HOME_SET_ERROR:
      return {
        ...state,
        status: API_STATUS.ERROR,
        errorMessage: action.payload
      }
    case HOME_FETCH_SUCCESS:
      return {
        ...state,
        data: mapResponseToSection(action.payload),
        status: API_STATUS.SUCCESS,
        errorMessage: null
      }
    case HOME_FETCH_MORE_DATA:
      return {
        ...state,
        status: API_STATUS.MORE_LOADING
      }
    case HOME_FETCH_MORE_SUCCESS:
      return {
        ...state,
        status: API_STATUS.SUCCESS,
        data: mapMerchants(state.data, action.payload)
      }

    default:
      return state
  }
}

export default homeReducer
