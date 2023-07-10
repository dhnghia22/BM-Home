import { ActionType } from '@/interface/action-type'
import {
  HOME_FETCH_DATA,
  HOME_FETCH_MORE_DATA,
  HOME_FETCH_MORE_SUCCESS,
  HOME_FETCH_SUCCESS,
  HOME_SET_ERROR,
  HOME_SET_LOADING,
  HOME_SET_MORE_LOADING,
  HOME_SET_REFRESHING
} from '../types/home-types'

export function setLoading(): ActionType {
  return {
    type: HOME_SET_LOADING,
    payload: null
  }
}

export function setRefreshing(): ActionType {
  return {
    type: HOME_SET_REFRESHING,
    payload: null
  }
}

export function setMoreLoading(): ActionType {
  return {
    type: HOME_SET_MORE_LOADING,
    payload: null
  }
}

export function fetchHomeData(isRefresh?: boolean): ActionType {
  return {
    type: HOME_FETCH_DATA,
    payload: {
      isRefresh: isRefresh
    }
  }
}

export function fetchMoreHomeData(page: number): ActionType {
  return {
    type: HOME_FETCH_MORE_DATA,
    payload: { page: page }
  }
}

export function setError(message: string): ActionType {
  return {
    type: HOME_SET_ERROR,
    payload: message
  }
}

export function setHomData(data: object): ActionType {
  return {
    type: HOME_FETCH_SUCCESS,
    payload: data
  }
}

export function setHomMoreData(data: object): ActionType {
  return {
    type: HOME_FETCH_MORE_SUCCESS,
    payload: data
  }
}
