import { combineReducers } from '@reduxjs/toolkit'
import appStateReducer from './ducks/appState'

const rootReducer = combineReducers({
    appState: appStateReducer,
})

export default rootReducer
