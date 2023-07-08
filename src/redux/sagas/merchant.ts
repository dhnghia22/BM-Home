import { takeLatest } from '@redux-saga/core/effects'

function* test() {

}

export default function* merchantWatcher() {
  yield takeLatest('test', test)
}