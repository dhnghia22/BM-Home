import { takeLatest } from '@redux-saga/core/effects'
import { all, fork, takeEvery } from 'redux-saga/effects'

function* watchAction3() {}
function* handleAction3(action: any) {
  // Xử lý action 3
}

function* watchAction4() {}

export default function* authModuleSaga() {
  yield all([fork(watchAction3), fork(watchAction4)])
}
