import { ActionType } from '@/interface/action-type'
import {
  HOME_FETCH_DATA,
  HOME_FETCH_SUCCESS,
  HOME_SET_ERROR,
  HOME_SET_LOADING
} from '../types/home-types'

export function setLoading(): ActionType {
  return {
    type: HOME_SET_LOADING,
    payload: null
  }
}
export function fetchData(): ActionType {
  return {
    type: HOME_FETCH_DATA,
    payload: null
  }
}

export function setError(message: string): ActionType {
    console.log('setError')
  return {
    type: HOME_SET_ERROR,
    payload: message
  }
}

export function setHomData(data: object): ActionType {
    console.log('setHomData')
  return {
    type: HOME_FETCH_SUCCESS,
    payload: data
  }
}
