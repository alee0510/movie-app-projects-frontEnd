// import all reducers
import logReducer from './logReducer'
import movieReducer from './movieReducer'

// combine all reducers
import { combineReducers } from 'redux'

const allReducers = combineReducers (
    {
        login : logReducer,
        movie : movieReducer
    }
)

export default allReducers