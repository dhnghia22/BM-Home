import { combineReducers } from 'redux'
import homeReducer from '@/redux/reducers/home-reducer';
import authReducer from '@/redux/reducers/auth-reducer';


const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer