import { takeLatest } from '@redux-saga/core/effects'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { HOME_FETCH_DATA, HOME_FETCH_MORE_DATA } from '../types/home-types';
import { setHomData, setError, setLoading } from '../actions/home-actions';
import { HomeApiServices, IGetHomeParam } from '@/services/common/home-api-service';
import { translate } from '@/i18n/translate';

// coordinates=106.68078570346272,10.81675548675936
// features=iconrevamp
// name=

function* fetchData() {
  yield put(setLoading());
  try {
    const params: IGetHomeParam = {
      coordinates: '106.68078570346272,10.81675548675936',
      features: 'iconrevamp',
      name: '',
    };
    const result = yield call(HomeApiServices.getHomeData, params);
    console.log("set home data fetchData");
    yield put(setHomData(result));
  } catch (e) {
    console.log("error: ");
    yield put(setError(translate('error.something_went_wrong')));
  }
}
function* fetchMoreData(action: any) {
  console.log("fetchMoreData fetchMoreData: ", action.payload)
}

function* watchAction4() {}

export default function* commonModuleSaga() {
  yield takeEvery(HOME_FETCH_DATA, fetchData);
  yield takeLatest(HOME_FETCH_MORE_DATA, fetchMoreData)
}
