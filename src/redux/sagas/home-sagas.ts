import { takeLatest } from '@redux-saga/core/effects'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { HOME_FETCH_DATA } from '../types/home-types';
import { setHomData, setError, setLoading } from '../actions/home-actions';
import { HomeApiServices } from '@/services/common/home-api-service';
import { translate } from '@/i18n/translate';

function* fetchData() {
  yield put(setLoading());
  try {
    const result = yield call(HomeApiServices.getHomeData);
    console.log("set home data fetchData");
    yield put(setHomData(result));
  } catch (e) {
    console.log("error: ");
    yield put(setError(translate('error.something_went_wrong')));
  }
}
function* handleAction3(action: any) {
  // Xử lý action 3
}

function* watchAction4() {}

export default function* commonModuleSaga() {
  yield takeEvery(HOME_FETCH_DATA, fetchData);
}
