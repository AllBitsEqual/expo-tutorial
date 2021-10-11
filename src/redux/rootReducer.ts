import { combineReducers } from '@reduxjs/toolkit'
import appStateReducer from './ducks/appState'
import progressReducer from './ducks/progress'

const rootReducer = combineReducers({
    appState: appStateReducer,
    progress: progressReducer,
})

export default rootReducer
