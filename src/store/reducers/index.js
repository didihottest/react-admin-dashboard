import { combineReducers } from "redux"
import darkModeReducer from './darkModeReducer'

const reducers = combineReducers({
  darkMode: darkModeReducer,
})

export default reducers