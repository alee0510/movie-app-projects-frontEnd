const INITIAL_STATE = {
    banner : []
}

const banerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'STORE_BANNER' :
            return {
                ...state,
                banner : action.payload
            }
        default :
            return state
    }
}

export default banerReducer