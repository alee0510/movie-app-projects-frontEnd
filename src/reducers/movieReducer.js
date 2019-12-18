const INITIAL_STATE = {
    movie : []
}

const movieReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'MOVIE' :
            return {
                movie : action.payload
            }
        default :
            return INITIAL_STATE
    }
}

export default movieReducer