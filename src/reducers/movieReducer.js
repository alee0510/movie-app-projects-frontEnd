const INITIAL_STATE = {
    movie : [],
    transcation : [],
    banner : []
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'MOVIE' :
            return {
                movie : action.payload
            }
        case 'CHECK_OUT' :
            return {
                ...state,
                transcation : action.payload
            }
        case 'STORE_BANNER' :
            return {
                ...state,
                banner : action.payload
            }
        default :
            return INITIAL_STATE
    }
}

export default movieReducer