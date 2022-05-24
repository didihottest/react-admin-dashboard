import { combineReducers } from "redux"
import darkModeReducer from './darkModeReducer'
import userReducer from './userReducer'
const reducers = combineReducers({
  darkMode: darkModeReducer,
  user: userReducer
})

export default reducers