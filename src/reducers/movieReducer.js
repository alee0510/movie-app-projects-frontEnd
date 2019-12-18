const INITIAL_STATE = {
    movie : []
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'MOVIE' :
            return {
                ...state,
                movie : action.payload
            }
        default :
            return state
    }
}

export default movieReducer