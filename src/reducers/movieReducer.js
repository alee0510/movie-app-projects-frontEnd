const INITIAL_STATE = {
    movie : [],
    selectMovieID : null,
    transcation : []
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'MOVIE' :
            return {
                movie : action.payload
            }
        case 'SELECT_MOVIE' :
            return {
                ...state,
                selectMovieID : action.payload
            }
        case 'CHECK_OUT' :
            return {
                ...state,
                transcation : action.payload
            }
        default :
            return INITIAL_STATE
    }
}

export default movieReducer