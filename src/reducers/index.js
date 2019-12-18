// import all reducers
import logReducer from './logReducer'
import movieReducer from './movieReducer'
import banerReducer from './bannerReducer'
import checkOutReducer from './checkOutReducer'

// combine all reducers
import { combineReducers } from 'redux'

const allReducers = combineReducers (
    {
        login : logReducer,
        movie : movieReducer,
        storeBanner : banerReducer,
        checkOut : checkOutReducer
    }
)

export default allReducers