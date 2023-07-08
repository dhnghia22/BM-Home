import { all } from 'redux-saga/effects';
import authModuleSaga from './auth-sagas'
import commonModuleSaga from './home-sagas'

export default function* rootSaga() {
  yield all([
    authModuleSaga(),
    commonModuleSaga(),
  ]);
}