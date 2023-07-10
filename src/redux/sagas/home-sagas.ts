import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { HOME_FETCH_DATA, HOME_FETCH_MORE_DATA } from '../types/home-types'
import {
  setHomData,
  setError,
  setLoading,
  setHomMoreData,
  setRefreshing
} from '../actions/home-actions'
import {
  HomeApiServices,
  IGetHomeParam
} from '@/services/common/home-api-service'
import { get } from 'lodash'
import { translate } from '@/i18n/translate'
import { ActionType } from '@/interface/action-type'

// coordinates=106.68078570346272,10.81675548675936
// features=iconrevamp
// name=

function* fetchData(action: ActionType) {
  yield get(action.payload, 'isRefresh') == true ? put(setRefreshing()) : put(setLoading())
  try {
    const params: IGetHomeParam = {
      coordinates: '106.68078570346272,10.81675548675936',
      features: 'iconrevamp',
      name: ''
    }
    const result = yield call(HomeApiServices.getHomeData, params)
    yield put(setHomData(result))
  } catch (e) {
    yield put(setError(translate('error.something_went_wrong')))
  }
}
function* fetchMoreData(action: ActionType) {
  try {
    const params: IGetHomeParam = {
      coordinates: '106.68078570346272,10.81675548675936',
      features: 'iconrevamp',
      name: '',
      page: get(action.payload, 'page')
    }
    const result = yield call(HomeApiServices.getHomeData, params)
    yield put(setHomMoreData(result))
  } catch (e) {
    yield put(setError(translate('error.something_went_wrong')))
  }
}

export default function* commonModuleSaga() {
  yield takeEvery(HOME_FETCH_DATA, fetchData)
  yield takeLatest(HOME_FETCH_MORE_DATA, fetchMoreData)
}
